import "../../Styles/IssueDrawerItem.less";
import "../../Styles/ItemIssues.less";
import React, { useState, useContext } from "react";
import { CalculatorFilled, CheckCircleOutlined } from "@ant-design/icons";
import { dataSource } from "./Data/ItemData";
import ResolutionOption from "./ResolutionSelect/ResolutionOption";
import ShipmentInfo from "./ResolutionSelect/ShipmentInfo";
import { AlignType } from "rc-table/lib/interface";
import {
    StateContext,
    SavedItemsContext,
    OpenItemsContext,
} from "./ItemIssues";
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

const IssueDrawerItem = ({
    index,
    itemType,
}: {
    index: number;
    itemType: any;
}): JSX.Element => {
    const createdIssues = useContext(StateContext);
    const [resolution, setResolution] = useState<string>("");
    const [convertedValue, setConvertedValue] = useState(
        createdIssues[index].price
    );
    const [openPanel, setOpenPanel] = useState([index.toString()]);
    const { savedItems, setSavedItems } = useContext(SavedItemsContext);
    const { openItems, setOpenItems } = useContext(OpenItemsContext);

    const convertCurrency = (value: string, amount: number) => {
        if (value === "$") setConvertedValue(amount);
        if (value === "€")
            setConvertedValue(Math.ceil(amount * 0.95 * 100) / 100);
    };

    const openMessage = () => {
        message.success({
            content: (
                <>
                    <Text className="message">
                        Item Issue Successfully Opened
                    </Text>{" "}
                    <br />
                    <Text className="message-text">
                        Your item issues have been successfully <br />
                        <span className="message-text__subtext">opened</span>
                    </Text>
                </>
            ),
            className: "success-message",
            icon: <CheckCircleOutlined />,
            style: {
                textAlign: "right" as AlignType,
                marginRight: 36,
            },
        });
    };

    const saveMessage = () => {
        message.success({
            content: (
                <>
                    <Text>Item Issue Successfully saved for Lates</Text> <br />
                    <Text className="message-text">
                        Your item issues have been successfully saved for <br />
                        <span className="message-text__subtext">later.</span>
                    </Text>
                </>
            ),
            className: "success-message",
            icon: <CheckCircleOutlined />,
            style: {
                textAlign: "right" as AlignType,
                marginRight: 36,
            },
        });
    };

    const selectBefore = (
        <Select
            onChange={(value) =>
                convertCurrency(value, createdIssues[index].price)
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
                            <img src={itemType[index].image} alt="item" />
                        </Tag>
                    </div>
                    <div className="tem-details__description">
                        <a href="/">{itemType[index].name}</a>
                        <p>{itemType[index].itemNumber}</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Warehouse",
            dataIndex: "warehouse",
            key: "warehouse",
            align: "center" as AlignType,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            align: "center" as AlignType,
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

    const addSavedItem = () => {
        dataSource.forEach((item) => {
            if (item.key === createdIssues[index].key) {
                item.status = "saved";
            }
        });
        createdIssues[index].status = "saved";
        setSavedItems([...savedItems, createdIssues[index]]);
        saveMessage();
        setOpenPanel(null);
    };

    const addOpenItem = () => {
        dataSource.forEach((item) => {
            if (item.key === createdIssues[index].key) {
                item.status = "open";
            }
        });
        createdIssues[index].status = "open";
        setOpenItems([...openItems, createdIssues[index]]);
        openMessage();
        setOpenPanel(null);
    };

    console.log(itemType);

    return (
        <>
            <Row className="drawer-item">
                <Collapse
                    activeKey={openPanel}
                    onChange={() => setOpenPanel(() => [index.toString()])}
                >
                    <Panel
                        header={
                            <>
                                <Text strong>
                                    {itemType[index].issueType +
                                        " > " +
                                        itemType[index].issueSubCategory}
                                </Text>
                                {itemType.status === "saved" && (
                                    <Tag
                                        className="drawer-item__saved-tag"
                                        color="gold"
                                    >
                                        Saved
                                    </Tag>
                                )}
                                {itemType.status === "open" && (
                                    <Tag
                                        className="drawer-item__open-tag"
                                        color="green"
                                    >
                                        Open
                                    </Tag>
                                )}
                            </>
                        }
                        key={index}
                    >
                        <Row className="drawer-item__item-table">
                            <Spin spinning={false}>
                                <Table
                                    pagination={false}
                                    columns={columns}
                                    dataSource={[itemType[index]]}
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
                                            className="drawer-item__resolution-input"
                                            wrapperCol={{
                                                span: 30,
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Must select resolution to create issue",
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
                                            index={index}
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
                                    <Button
                                        onClick={addSavedItem}
                                        type="primary"
                                        ghost
                                    >
                                        Save for Later
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={addOpenItem}
                                        type="primary"
                                    >
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
