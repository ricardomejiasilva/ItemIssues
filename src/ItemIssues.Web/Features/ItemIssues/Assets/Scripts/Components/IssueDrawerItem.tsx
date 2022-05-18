/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "../../Styles/IssueDrawerItem.less";
import "../../Styles/ItemIssues.less";
import React, { useState, useContext } from "react";
import { CalculatorFilled, CheckCircleOutlined } from "@ant-design/icons";
import ResolutionOption from "./ResolutionSelect/ResolutionOption";
import ShipmentInfo from "./ResolutionSelect/ShipmentInfo";
import { StateContext } from "./ItemIssues";
import {
    Row,
    Col,
    Collapse,
    Tag,
    Spin,
    Table,
    Select,
    Input,
    Button,
    Form,
    Space,
    message,
    Typography,
} from "antd";

const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;

const IssueDrawerItem = ({ index }: { index: number }): JSX.Element => {
    const createdIssues = useContext(StateContext);
    const [resolution, setResolution] = useState<string>("");
    const [convertedValue, setConvertedValue] = useState(
        createdIssues[index].price
    );

    function handleChange(value: string, amount: number) {
        if (value === "$") setConvertedValue(amount);
        if (value === "€")
            setConvertedValue(Math.ceil(amount * 0.95 * 100) / 100);
    }

    const success = () => {
        message.success({
            content: (
                <>
                    <Text>Item Issue Successfully Opened</Text> <br />
                    <Text className="message-text">
                        Your item issues have been successfully <br />
                        <span className="message-text__subtext">opened</span>
                    </Text>
                </>
            ),
            className: "success-message",
            icon: <CheckCircleOutlined />,
            style: {
                textAlign: "right",
                marginRight: 36,
            },
        });
    };

    const selectBefore = (
        <Select
            onChange={(value) =>
                handleChange(value, createdIssues[index].price)
            }
            defaultValue="$"
            className="select-before"
        >
            <Option value="$">$</Option>
            <Option value="€">€</Option>
        </Select>
    );

    const columns = [
        {
            title: "Item",
            dataIndex: "name",
            key: "name",
            render: () => (
                <div className="item-details">
                    <div>
                        <Tag className="item-details__tag">
                            <img src={createdIssues[index].image} alt="item" />
                        </Tag>
                    </div>
                    <div className="tem-details__description">
                        <a href="/">{createdIssues[index].name}</a>
                        <p>{createdIssues[index].itemNumber}</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Warehouse",
            dataIndex: "warehouse",
            key: "warehouse",
            align: "center",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            align: "center",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            render: () => (
                <Input
                    addonBefore={selectBefore}
                    addonAfter={<CalculatorFilled className="calc-btn" />}
                    value={convertedValue}
                />
            ),
        },
    ];

    return (
        <>
            <Row className="drawer-item">
                <Collapse defaultActiveKey={["1"]}>
                    <Panel
                        header={
                            <>
                                <Text strong>
                                    {createdIssues[index].issueType +
                                        " > " +
                                        createdIssues[index].issueSubCategory}
                                </Text>
                                <Tag
                                    className="drawer-item__panel-tag"
                                    color="green"
                                >
                                    Open
                                </Tag>
                            </>
                        }
                        key="1"
                    >
                        <Row className="drawer-item__item-table">
                            <Spin spinning={false}>
                                <Table
                                    pagination={false}
                                    columns={columns}
                                    dataSource={[createdIssues[index]]}
                                />
                            </Spin>
                        </Row>
                        <Row className="drawer-item__resolution">
                            <Col>
                                <Row>
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 16 }}
                                        initialValues={{ remember: true }}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Resolution"
                                            name="Select Resolution"
                                            className="drawer-item__resolution-input"
                                            wrapperCol={{
                                                span: 30,
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your username!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Select Resolution"
                                                className="drawer-item__resolution-select"
                                                onSelect={(value: string) => {
                                                    setResolution(value);
                                                }}
                                            >
                                                <Option value="payment credit">
                                                    Payment Credit
                                                </Option>
                                                <Option value="store credit">
                                                    Store Credit
                                                </Option>
                                                <Option value="0 order">
                                                    $0 Order
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Row>
                                <Row>
                                    {resolution.length > 1 && (
                                        <ResolutionOption
                                            resolution={resolution}
                                        />
                                    )}
                                </Row>
                            </Col>
                            <Col>
                                {resolution === "store credit" && (
                                    <ShipmentInfo />
                                )}
                            </Col>
                        </Row>
                        <Row className="action-btns">
                            <Space size={16}>
                                <Col>
                                    <Button>Cancel Issue</Button>
                                </Col>
                                <Col>
                                    <Button type="primary" ghost>
                                        Save All for Later
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={success} type="primary">
                                        Create Issue
                                    </Button>
                                </Col>
                            </Space>
                        </Row>
                    </Panel>
                </Collapse>
            </Row>
        </>
    );
};

export default IssueDrawerItem;
