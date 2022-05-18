/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect, createContext } from "react";
import "../../Styles/ItemIssues.less";
import "antd/dist/antd.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import IssuesDrawer from "./IssuesDrawer";
import { dataSource } from "./Data/ItemData";
import { dataSourceOpen } from "./Data/ItemDataOpen";
import { dataSourceSaved } from "./Data/ItemDataSaved";
import { issueInfo } from "./Data/IssueInfo";
import {
    Table,
    Tabs,
    Layout,
    Typography,
    Row,
    Col,
    Input,
    Button,
    Spin,
    Tag,
    Checkbox,
    Select,
    Popover,
    Space,
} from "antd";

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
}

interface CreatedIssues {
    image: string;
    issueSubCategory: string;
    issueType: string;
    itemNumber: string;
    key: string;
    name: string;
    price: number;
    quantity: number;
}

export const StateContext = createContext<CreatedIssues[]>([
    {
        key: "",
        name: "",
        price: 0,
        itemNumber: "",
        image: "",
        quantity: 0,
        issueType: "",
        issueSubCategory: "",
    },
]);

const ItemIssues = (): JSX.Element => {
    const { Title, Text } = Typography;
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { Content, Sider } = Layout;

    const [quantity, setQuantity] = useState<Input[]>([]);
    const [type, setType] = useState<Input[]>([]);
    const [issue, setIssue] = useState<Input[]>([]);
    const [issueDrawerCollapsed, setIssueDrawerCollapsed] =
        useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("0");

    const [createdIssues, setCreatedIssues] = useState<CreatedIssues[]>([]);
    const [savedItems, setSavedItems] = useState<Input[]>([]);
    const [openItems, setOpenItems] = useState<Input[]>([]);

    const updateInput = (
        value: string,
        record: string,
        updateState: React.Dispatch<React.SetStateAction<Input[]>>,
        state: Input[]
    ) => {
        const recordedObj = {
            id: record as string,
            key: value.key as string,
            value: value.value as string,
        };

        let updatedObj;
        if (state.map((row: Input) => row.id).includes(recordedObj.id)) {
            updatedObj = state.map((item: Input) => {
                return item.id == record ? recordedObj : item;
            });
        } else {
            updatedObj = [...state, recordedObj];
        }

        updateState(updatedObj);
    };

    const createIssue = () => {
        const stagedItems: Record[] = issue
            .map((item) => {
                return dataSource.filter((obj) => obj.key == item.id);
            })
            .flat();

        const addInputInfo: CreatedIssues[] = stagedItems
            .map((item: Record) => {
                return quantity
                    .map((obj, index) => {
                        if (item.key === obj.id) {
                            console.log(obj.value);

                            return {
                                ...item,
                                quantity: parseInt(obj.value),
                                issueType: type[index].value,
                                issueSubCategory: issue[index].value,
                            };
                        }
                    })
                    .filter((i) => i !== undefined)
                    .flat();
            })
            .flat();

        setIssueDrawerCollapsed(false);

        return setCreatedIssues(addInputInfo);
    };

    const addItemRow = () => {
        return (
            <Row justify="space-between">
                <Col>
                    <Row>
                        <Space direction="horizontal" size={16}>
                            <Col>
                                <Input placeholder="Add Item #" />
                            </Col>
                            <Col>
                                <Button>Add Item</Button>
                            </Col>
                        </Space>
                    </Row>
                </Col>
                <Col>
                    <Button>Bulk Select</Button>
                </Col>
            </Row>
        );
    };

    const columns = [
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
        },
        {
            title: "Shipped From",
            dataIndex: "warehouse",
            key: "warehouse",
            align: "center",
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
                    onChange={(value) => {
                        updateInput(value, record.key, setType, type);
                    }}
                >
                    <Option key="carrier error" value="Carrier Error">
                        Carrier Error
                    </Option>
                    <Option key="product complaints" value="Product Complaints">
                        Product Complaints
                    </Option>
                    <Option key="standard return" value="Standard Return">
                        Standard Return
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
                        disabled={!type.some((i: Input) => i.id == record.key)}
                        onChange={(value) => {
                            updateInput(value, record.key, setIssue, issue);
                        }}
                    >
                        <Option key="defective" value="Defective">
                            Defective
                        </Option>
                        <Option key="melted" value="Melted">
                            Melted
                        </Option>
                        <Option key="spoiled" value="Spoiled">
                            Spoiled
                        </Option>
                        <Option key="unhappy" value="Unhappy">
                            Unhappy w/ Quality
                        </Option>
                        <Option key="used" value="Used">
                            Used
                        </Option>
                    </Select>
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
            title: "OTE",
            dataIndex: "name",
            key: "ote",
            render: () => <Checkbox />,
        },
    ];

    return (
        <>
            <StateContext.Provider value={createdIssues}>
                <Layout className="layout">
                    <Content className="content">
                        <Row>
                            <div className="relative-path">
                                <a className="relative-path__home" href="/">
                                    Home{" "}
                                </a>
                                <p>/</p>
                                <a href="/">Content</a>
                                <p>/</p>
                            </div>
                        </Row>

                        <Row>
                            <Title level={3}>
                                Add Item Issues for Order # {63547057}
                            </Title>
                        </Row>
                        <Space
                            direction="vertical"
                            size={16}
                            className="full-width"
                        >
                            <Col>
                                <Row className="display-block">
                                    <Tabs
                                        type="card"
                                        onChange={(activeKey) =>
                                            setActiveTab(activeKey)
                                        }
                                    >
                                        <TabPane
                                            tab={
                                                <div>
                                                    <Tag>
                                                        {dataSource.length}
                                                    </Tag>
                                                    <Text className="tab-text">
                                                        Items
                                                    </Text>
                                                </div>
                                            }
                                            key="0"
                                        >
                                            <Space
                                                direction="vertical"
                                                size={16}
                                                className="full-width"
                                            >
                                                <Col>{addItemRow()}</Col>
                                                <Col>
                                                    <Row>
                                                        <Col span={24}>
                                                            <Spin
                                                                spinning={false}
                                                            >
                                                                <Table
                                                                    rowClassName={(
                                                                        record
                                                                    ) => {
                                                                        if (
                                                                            issue.length >
                                                                                0 &&
                                                                            issue.some(
                                                                                (
                                                                                    item: Input
                                                                                ) =>
                                                                                    record.key ===
                                                                                    item.id
                                                                            )
                                                                        )
                                                                            return "highlighted";
                                                                    }}
                                                                    pagination={
                                                                        false
                                                                    }
                                                                    columns={
                                                                        columns
                                                                    }
                                                                    dataSource={
                                                                        dataSource
                                                                    }
                                                                />
                                                            </Spin>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Space>
                                        </TabPane>
                                        <TabPane
                                            tab={
                                                <div>
                                                    <Tag>1</Tag>
                                                    <Text className="tab-text">
                                                        Saved
                                                    </Text>
                                                </div>
                                            }
                                            key="1"
                                        >
                                            <Space
                                                direction="vertical"
                                                size={16}
                                            >
                                                <Col>{addItemRow()}</Col>
                                                <Col>
                                                    <Row>
                                                        <Col span={24}>
                                                            <Spin
                                                                spinning={false}
                                                            >
                                                                <Table
                                                                    rowClassName={(
                                                                        record
                                                                    ) => {
                                                                        if (
                                                                            issue.length >
                                                                                0 &&
                                                                            issue.some(
                                                                                (
                                                                                    item: Input
                                                                                ) =>
                                                                                    record.key ===
                                                                                    item.id
                                                                            )
                                                                        )
                                                                            return "highlighted";
                                                                    }}
                                                                    pagination={
                                                                        false
                                                                    }
                                                                    columns={
                                                                        columns
                                                                    }
                                                                    dataSource={
                                                                        dataSourceSaved
                                                                    }
                                                                />
                                                            </Spin>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Space>
                                        </TabPane>
                                        <TabPane
                                            tab={
                                                <div>
                                                    <Tag>1</Tag>
                                                    <Text className="tab-text">
                                                        Open
                                                    </Text>
                                                </div>
                                            }
                                            key="2"
                                        >
                                            <Space
                                                direction="vertical"
                                                size={16}
                                            >
                                                <Col>{addItemRow()}</Col>

                                                <Col>
                                                    <Row>
                                                        <Col span={24}>
                                                            <Spin
                                                                spinning={false}
                                                            >
                                                                <Table
                                                                    rowClassName={(
                                                                        record
                                                                    ) => {
                                                                        if (
                                                                            issue.length >
                                                                                0 &&
                                                                            issue.some(
                                                                                (
                                                                                    item: Input
                                                                                ) =>
                                                                                    record.key ===
                                                                                    item.id
                                                                            )
                                                                        )
                                                                            return "highlighted";
                                                                    }}
                                                                    pagination={
                                                                        false
                                                                    }
                                                                    columns={
                                                                        columns
                                                                    }
                                                                    dataSource={
                                                                        dataSourceOpen
                                                                    }
                                                                />
                                                            </Spin>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Space>
                                        </TabPane>
                                    </Tabs>
                                </Row>
                            </Col>
                            <Col>
                                <Row justify="end">
                                    <Col>
                                        <Button
                                            disabled={issue.length === 0}
                                            type="primary"
                                            onClick={createIssue}
                                        >
                                            Create Issue(s)
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Space>
                    </Content>
                    <Sider
                        trigger={null}
                        className="sider"
                        collapsible
                        theme={"light"}
                        collapsed={issueDrawerCollapsed}
                        collapsedWidth={48}
                        width="1073px"
                    >
                        <IssuesDrawer
                            {...{
                                collapsed: issueDrawerCollapsed,
                                setCollapsed: setIssueDrawerCollapsed,
                                activeTab,
                                createdIssues,
                            }}
                        />
                    </Sider>
                </Layout>
            </StateContext.Provider>
        </>
    );
};

export default ItemIssues;
