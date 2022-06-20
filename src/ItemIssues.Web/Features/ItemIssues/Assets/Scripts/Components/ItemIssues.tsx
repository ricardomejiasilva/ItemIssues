import React, { useState, createContext } from "react";
import "../../Styles/ItemIssues.less";
import "antd/dist/antd.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import IssuesDrawer from "./IssuesDrawer";
import { dataSource } from "./Data/ItemData";
import { issueInfo } from "./Data/IssueInfo";
import { issueSelection } from "./Data/IssueSelection";
import { AlignType } from "rc-table/lib/interface";
import OpenTab from "./Tabs/OpenTab";
import SavedTab from "./Tabs/SavedTab";
import ItemsTab from "./Tabs/ItemsTab";
import SplitItem from "./SplitItem";
import { Record, CreatedIssues } from "../Interface";
import {
    Tabs,
    Layout,
    Typography,
    Row,
    Col,
    Input,
    Button,
    Tag,
    Checkbox,
    Select,
    Popover,
    Space,
    Modal,
} from "antd";

interface Input {
    id: string;
    key: string;
    value: string;
}
interface Quantity {
    id: string;
    key: number | string;
    value: number | string;
}

interface Value {
    label: string;
    value: string;
    key: string;
    disabled: boolean;
}

export const StateContext = createContext<CreatedIssues[]>([]);
export const SavedItemsContext = createContext<any>([]);
export const OpenItemsContext = createContext<any>([]);
export const CanceledItemsContext = createContext<any>([]);

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
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [createdIssues, setCreatedIssues] = useState<CreatedIssues[]>([]);
    const [savedItems, setSavedItems] = useState<CreatedIssues[]>([]);
    const [openItems, setOpenItems] = useState<CreatedIssues[]>([]);
    const [canceledItems, setCanceledItems] = useState<CreatedIssues[]>([]);

    const updateInput = (
        value: Value,
        record: string,
        updateState: React.Dispatch<React.SetStateAction<Input[]>>,
        state: Input[]
    ) => {
        const recordedObj = {
            id: record,
            key: value.key,
            value: value.value,
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

    const getSubTypes = (record: Record) => {
        const selectedType = type.find((item) => record.key === item.id);
        if (!selectedType) return null;
        const selectedIssue = issueSelection.find(
            (item) => selectedType.key === item.type
        );
        if (!selectedIssue) return null;
        return selectedIssue.subTypes.map((value) => {
            return { value };
        });
    };

    const updateKey = (activeKey: string) => {
        setActiveTab(() => activeKey);
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
                    <div className="item-details__description">
                        <a href="/">{record.name}</a>
                        <p>Item # {record.itemNumber}</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Shipped From",
            dataIndex: "warehouse",
            key: "warehouse",
            align: "center" as AlignType,
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
                        Web Error
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
                                    Things to consider when deciding if this
                                    should be a one time exception:
                                </Text>
                                <ul>
                                    <li>
                                        Customer type (Residential or Business)
                                    </li>
                                    <li>
                                        Customer spend (Is this their first
                                        order, or do they have a long history
                                        with us?)
                                    </li>
                                    <li>
                                        Have OTEs been made previously? (If so,
                                        was it made clear that this is the last
                                        time we can make this type of
                                        exception?)
                                    </li>
                                    <li>
                                        How different is this exception from our
                                        Business Model? (Do we usually do this
                                        in most cases or is this rare?)
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
        {
            title: "",
            dataIndex: "",
            key: "split",
            render: (_: null, record: Record) => (
                <>
                    {quantity.some(
                        (item: Quantity) =>
                            item.id == record.key && item.value > 1
                    ) && (
                        <Button
                            onClick={() => setIsModalVisible(true)}
                            className="split-btn"
                        >
                            Split
                        </Button>
                    )}
                    <Button
                        onClick={() => setIsModalVisible(true)}
                        className="split-btn hidden"
                    >
                        Unsplit
                    </Button>
                </>
            ),
        },
    ];

    console.log(quantity);

    return (
        <>
            <StateContext.Provider value={createdIssues}>
                <SavedItemsContext.Provider
                    value={{ savedItems, setSavedItems }}
                >
                    <OpenItemsContext.Provider
                        value={{ openItems, setOpenItems }}
                    >
                        <CanceledItemsContext.Provider
                            value={{ canceledItems, setCanceledItems }}
                        >
                            <Layout className="layout">
                                <Content className="content">
                                    <Row>
                                        <div className="relative-path">
                                            <a
                                                className="relative-path__home"
                                                href="/"
                                            >
                                                Home
                                            </a>
                                            <p>/</p>
                                            <a href="/">Content</a>
                                            <p>/</p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Title level={3}>
                                            Add Item Issues for Order #
                                            {63547057}
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
                                                        updateKey(activeKey)
                                                    }
                                                >
                                                    <TabPane
                                                        key="0"
                                                        tab={
                                                            <div>
                                                                <Tag>
                                                                    {
                                                                        dataSource.length
                                                                    }
                                                                </Tag>
                                                                <Text className="tab-text">
                                                                    Items
                                                                </Text>
                                                            </div>
                                                        }
                                                    >
                                                        <ItemsTab
                                                            dataSource={
                                                                dataSource
                                                            }
                                                            issue={issue}
                                                            columns={columns}
                                                        />
                                                    </TabPane>
                                                    {savedItems.length > 0 && (
                                                        <TabPane
                                                            key="1"
                                                            tab={
                                                                <div>
                                                                    <Tag>
                                                                        {
                                                                            savedItems.length
                                                                        }
                                                                    </Tag>
                                                                    <Text className="tab-text">
                                                                        Saved
                                                                        Items
                                                                    </Text>
                                                                </div>
                                                            }
                                                        >
                                                            <SavedTab
                                                                savedItems={
                                                                    savedItems
                                                                }
                                                                issue={issue}
                                                                columns={
                                                                    columns
                                                                }
                                                                collapsed={
                                                                    issueDrawerCollapsed
                                                                }
                                                                setCollapsed={
                                                                    setIssueDrawerCollapsed
                                                                }
                                                            />
                                                        </TabPane>
                                                    )}
                                                    {openItems.length > 0 && (
                                                        <TabPane
                                                            key="2"
                                                            tab={
                                                                <div>
                                                                    <Tag>
                                                                        {
                                                                            openItems.length
                                                                        }
                                                                    </Tag>
                                                                    <Text className="tab-text">
                                                                        Open
                                                                        Items
                                                                    </Text>
                                                                </div>
                                                            }
                                                        >
                                                            <OpenTab
                                                                issue={issue}
                                                                openItems={
                                                                    openItems
                                                                }
                                                                columns={
                                                                    columns
                                                                }
                                                                collapsed={
                                                                    issueDrawerCollapsed
                                                                }
                                                                setCollapsed={
                                                                    setIssueDrawerCollapsed
                                                                }
                                                            />
                                                        </TabPane>
                                                    )}
                                                </Tabs>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row justify="end">
                                                <Col>
                                                    <Button
                                                        disabled={
                                                            issue.length === 0
                                                        }
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
                                <Row>
                                    <Col
                                        className={
                                            !issueDrawerCollapsed && "overlay"
                                        }
                                        onClick={() =>
                                            setIssueDrawerCollapsed(true)
                                        }
                                    />
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
                                                setCollapsed:
                                                    setIssueDrawerCollapsed,
                                                activeTab,
                                                createdIssues,
                                            }}
                                        />
                                    </Sider>
                                </Row>
                                <Modal
                                    className="split-modal"
                                    title="Split Modal"
                                    visible={isModalVisible}
                                    onOk={() => setIsModalVisible(false)}
                                    onCancel={() => setIsModalVisible(false)}
                                    footer={[
                                        <Button
                                            key="back"
                                            onClick={() =>
                                                setIsModalVisible(false)
                                            }
                                        >
                                            Cancel
                                        </Button>,
                                        <Button
                                            key="submit"
                                            type="primary"
                                            onClick={() =>
                                                setIsModalVisible(false)
                                            }
                                        >
                                            Submit Split
                                        </Button>,
                                    ]}
                                >
                                    <Row>
                                        <Text>
                                            Select Quantity and Issue Type for
                                            each Split
                                        </Text>
                                    </Row>
                                    <Row>
                                        <SplitItem />
                                        <SplitItem />
                                    </Row>
                                </Modal>
                            </Layout>
                        </CanceledItemsContext.Provider>
                    </OpenItemsContext.Provider>
                </SavedItemsContext.Provider>
            </StateContext.Provider>
        </>
    );
};

export default ItemIssues;
