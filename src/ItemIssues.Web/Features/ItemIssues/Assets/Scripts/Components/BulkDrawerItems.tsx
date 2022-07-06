import React, { useContext, useState } from "react";
import "../../Styles/IssueDrawerItem.less";
import "../../Styles/ItemIssues.less";
import { CalculatorFilled } from "@ant-design/icons";
import { dataSource } from "./Data/ItemData";
import { AlignType } from "rc-table/lib/interface";
import {
    Row,
    Col,
    Collapse,
    Tag,
    Table,
    Select,
    Input,
    Button,
    Form,
    Space,
    Typography,
} from "antd";

const BulkDrawerItems = ({ separate }: { separate: boolean }) => {
    const [convertedValue, setConvertedValue] = useState<number>(34.39);
    const { Panel } = Collapse;
    const { Option } = Select;
    const { Text } = Typography;

    const convertCurrency = (value: string, amount: number) => {
        if (value === "$") setConvertedValue(amount);
        if (value === "€")
            setConvertedValue(Math.ceil(amount * 0.95 * 100) / 100);
    };

    const selectBefore = (
        <Select
            onChange={(value) => convertCurrency(value, 34.39)}
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
                <Row className="item-details">
                    <Space size={16}>
                        <Col>
                            <Tag className="item-details__tag">
                                <img src={dataSource[0].image} alt="item" />
                            </Tag>
                        </Col>
                        <Col className="item-details__description">
                            <Space direction="vertical" size={0}>
                                <a href="/">{dataSource[0].name}</a>
                                <Text>Item # {dataSource[0].itemNumber}</Text>
                            </Space>
                        </Col>
                    </Space>
                </Row>
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
            render: () => (
                <Row>
                    <Space size={33}>
                        <Input
                            className="price-input"
                            addonBefore={selectBefore}
                            addonAfter={
                                <CalculatorFilled className="calc-btn" />
                            }
                            value={convertedValue}
                        />
                        <Button
                            className={
                                separate ? "skinny-btn hidden" : "skinny-btn"
                            }
                        >
                            Resolve Separately
                        </Button>
                    </Space>
                </Row>
            ),
        },
    ];

    return (
        <Collapse className="panel" defaultActiveKey={["1"]}>
            <Panel key="1" header="Product Complaints > Unhappy w/ Quality">
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={dataSource}
                />
                <Row>
                    <Form.Item
                        name="resolution"
                        label="Resolution"
                        className="drawer-item__resolution-input"
                        labelCol={{ span: 13 }}
                        wrapperCol={{ span: 16 }}
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
                        >
                            <Option value="payment credit">
                                Payment Credit
                            </Option>
                            <Option value="store credit">Store Credit</Option>
                            <Option value="0 order">$0 Order</Option>
                        </Select>
                    </Form.Item>
                </Row>
                <Row className="action-btns">
                    <Space size={16}>
                        <Form.Item>
                            <Button
                                className="skinny-btn bg-clear"
                                htmlType="submit"
                                disabled
                            >
                                Cancel Issue
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="skinny-btn bg-clear"
                                type="primary"
                                htmlType="submit"
                                ghost
                                disabled
                            >
                                Save for Later
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="skinny-btn"
                                type="primary"
                                htmlType="submit"
                                disabled
                            >
                                Create Issue
                            </Button>
                        </Form.Item>
                    </Space>
                </Row>
            </Panel>
        </Collapse>
    );
};

export default BulkDrawerItems;
