import React, { useContext } from "react";
import IssueDrawerItem from "./IssueDrawerItem";
import "../../Styles/IssuesDrawer.less";
import HistoryItem from "./ResolutionSelect/HistoryItem";
import { SavedItemsContext, OpenItemsContext } from "./ItemIssues";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
    Row,
    Col,
    Typography,
    Input,
    Layout,
    Space,
    Button,
    Form,
    Alert,
} from "antd";

interface CreatedIssues {
    key: string;
    name: string;
    price: number;
    itemNumber: string;
    image: string;
    quantity: number;
    issueType: string;
    issueSubCategory: string;
}

const { Title, Text } = Typography;
const { Footer } = Layout;
const { TextArea } = Input;

const IssuesDrawer = ({
    collapsed,
    setCollapsed,
    activeTab,
    createdIssues,
}: {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab: string;
    createdIssues: CreatedIssues[];
}): JSX.Element => {
    const { savedItems } = useContext(SavedItemsContext);
    const { openItems } = useContext(OpenItemsContext);
    return (
        <>
            <Row className="drawer-container">
                <Col className="left-tab">
                    <Row justify="center">
                        {collapsed ? (
                            <MenuFoldOutlined
                                className="left-tab__menu-btn"
                                onClick={() => setCollapsed(false)}
                            />
                        ) : (
                            <MenuUnfoldOutlined
                                className="left-tab__menu-btn"
                                onClick={() => setCollapsed(true)}
                            />
                        )}
                    </Row>
                </Col>

                {!collapsed && (
                    <Col className="drawer-content">
                        <Row className="drawer-content__title">
                            {activeTab === "0" && (
                                <Title level={5}>
                                    Resolve {createdIssues.length} Item Issue(s)
                                </Title>
                            )}
                            <Title
                                className={activeTab === "0" && "hidden"}
                                level={5}
                            >
                                {activeTab === "1" ? "Saved" : "Open"} 2 Item
                                Issue(s)
                            </Title>
                        </Row>
                        {activeTab === "0" && (
                            <Form>
                                <Row
                                    justify="space-between"
                                    className="drawer-content__top-inputs"
                                >
                                    <Col>
                                        <Form.Item
                                            label="Briefcase Number"
                                            name="briefcase number"
                                            wrapperCol={{
                                                span: 30,
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Must enter Briefcase #",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Space size={18}>
                                            <Col>
                                                <Form.Item
                                                    label="Global Comment"
                                                    name="Global Comment"
                                                    wrapperCol={{
                                                        span: 30,
                                                    }}
                                                    rules={[
                                                        {
                                                            message:
                                                                "Add global comment",
                                                        },
                                                    ]}
                                                >
                                                    <TextArea
                                                        placeholder="Add global comment"
                                                        rows={1}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Button
                                                    className="apply-all-btn"
                                                    type="primary"
                                                    ghost
                                                >
                                                    Apply to All
                                                </Button>
                                            </Col>
                                        </Space>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                        {activeTab === "0" &&
                            createdIssues.map((_: null, index: number) => {
                                return (
                                    <IssueDrawerItem
                                        key={index}
                                        index={index}
                                        itemType={createdIssues}
                                    />
                                );
                            })}
                        {activeTab === "1" &&
                            savedItems.map((_: null, index: number) => {
                                return (
                                    <IssueDrawerItem
                                        key={index}
                                        index={index}
                                        itemType={savedItems}
                                    />
                                );
                            })}
                        {activeTab == "2" &&
                            openItems.map((_: null, index: number) => {
                                return (
                                    <IssueDrawerItem
                                        key={index}
                                        index={index}
                                        itemType={openItems}
                                    />
                                );
                            })}

                        {activeTab !== "0" && (
                            <Row className="history-container">
                                <Col>
                                    <Space direction="vertical" size={16}>
                                        <Col>
                                            <Row>
                                                <Text strong>History</Text>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <HistoryItem />
                                            </Row>
                                        </Col>
                                    </Space>
                                </Col>
                            </Row>
                        )}
                        <Footer className="footer">
                            <Row justify="space-between">
                                <Col>
                                    <Alert
                                        className="hidden"
                                        message="To create issues, fix errors or create issue individually"
                                        type="error"
                                        showIcon
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <Space size={16}>
                                            <Col>
                                                <Button
                                                    type="primary"
                                                    danger
                                                    ghost
                                                >
                                                    Cancel Issue
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button type="primary" ghost>
                                                    Save All for Later
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    className="create-btn"
                                                    type="primary"
                                                >
                                                    Create Issue
                                                </Button>
                                            </Col>
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        </Footer>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default IssuesDrawer;
