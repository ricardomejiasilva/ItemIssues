import React from "react";
import { Input, Tag, Checkbox, Select, Popover, Space, Typography } from "antd";

interface Input {
    id: string;
    key: string;
    value: string;
}

interface Record {
    image: string;
    itemNumber: string;
    key: string;
    name: string;
    price: number;
    warehouse: number;
    status: string;
}

const { Text } = Typography;
const { Option } = Select;

export const columns = [
    {
        title: "Item",
        dataIndex: "name",
        key: "name",
        render: (_: null, record: Record) => (
            <div className="item-details">
                <div>
                    <Tag className="item-details__tag">
                        <img src={record.image} alt="item" />
                    </Tag>
                </div>
                <div className="tem-details__description">
                    <a href="/">{record.name}</a>
                    <p>Item # {record.itemNumber}</p>
                </div>
            </div>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center" as AlignType,
        render: (_: null, record: Record) => {
            return (
                record.status && (
                    <Tag
                        className={`drawer-item__${record.status}-tag`}
                        color={colorSelector(record.status)}
                    >
                        {record.status}
                    </Tag>
                )
            );
        },
    },
    {
        title: "Shipped From",
        dataIndex: "warehouse",
        key: "warehouse",
        align: "center" as const,
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Quantity",
        dataIndex: "name",
        key: "quantity",
        render: (_: null, record: Record) => (
            <Select
                placeholder="1"
                labelInValue
                className="item-quantity"
                disabled={dataSource.some((item: Record) => {
                    if (item.key === record.key && item.status.length > 1)
                        return true;
                })}
                onChange={(value) => {
                    updateInput(value, record.key, setQuantity, quantity);
                }}
            >
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={0}>0</Option>
            </Select>
        ),
    },
    {
        title: "Type",
        dataIndex: "age",
        key: "type",
        render: (_: null, record: Record) => (
            <Select
                placeholder="Select a Type"
                labelInValue
                className="item-type"
                disabled={dataSource.some((item: Record) => {
                    if (item.key === record.key && item.status.length > 1)
                        return true;
                })}
                onChange={(value) => {
                    updateInput(value, record.key, setType, type);
                }}
            >
                <Option key="carrier error" value="Carrier Error">
                    Carrier Error
                </Option>
                <Option
                    key="plus membership cancellation"
                    value="Plus Membership Cancellation"
                >
                    Plus Membership Cancellation
                </Option>
                <Option key="product complaints" value="Product Complaints">
                    Product Complaints
                </Option>
                <Option key="standard return" value="Standard Return">
                    Standard Return
                </Option>
                <Option key="vendor error" value="Standard Return">
                    Vendor Error
                </Option>
                <Option key="warehouse error" value="Warehouse Error">
                    Warehouse Error
                </Option>
                <Option key="web error" value="Web Error">
                    Web error
                </Option>
            </Select>
        ),
    },
    {
        title: "Issue",
        dataIndex: "address",
        key: "issue",
        render: (_: null, record: Record) => (
            <Space size={20}>
                <Select
                    placeholder="Select an Issue"
                    labelInValue
                    className="item-issue"
                    disabled={type.some((i: Input) => {
                        if (i.id === record.key) false;
                        const disable = dataSource.some((item: Record) => {
                            if (
                                item.key === record.key &&
                                item.status.length > 1
                            )
                                return true;
                        });
                        return disable;
                    })}
                    onChange={(value) => {
                        updateInput(value, record.key, setIssue, issue);
                    }}
                    options={getSubTypes(record)}
                />
                {issue.some((obj: Input) => obj.id == record.key) && (
                    <Popover
                        content={issueInfo[0].text}
                        title={`${
                            type.filter(
                                (item: Input) => item.id == record.key
                            )[0].value
                        } 
                        > ${
                            issue.filter(
                                (item: Input) => item.id == record.key
                            )[0].value
                        }`}
                    >
                        <InfoCircleOutlined />
                    </Popover>
                )}
            </Space>
        ),
    },
    {
        title: (
            <Space>
                <Text>OTE</Text>
                <Popover
                    placement="leftTop"
                    title="One Time Exception"
                    className="ote-popover"
                    content={
                        <Space direction="vertical">
                            <Text>
                                Things to consider when deciding if this should
                                be a one time exception:
                            </Text>
                            <ul>
                                <li>Customer type (Residential or Business)</li>
                                <li>
                                    Customer spend (Is this their first order,
                                    or do they have a long history with us?)
                                </li>
                                <li>
                                    Have OTEs been made previously? (If so, was
                                    it made clear that this is the last time we
                                    can make this type of exception?)
                                </li>
                                <li>
                                    How different is this exception from our
                                    Business Model? (Do we usually do this in
                                    most cases or is this rare?)
                                </li>
                            </ul>
                        </Space>
                    }
                >
                    <InfoCircleOutlined />
                </Popover>
            </Space>
        ),
        dataIndex: "name",
        key: "ote",
        align: "center" as const,
        render: () => <Checkbox />,
    },
];
