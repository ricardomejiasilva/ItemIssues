import React, { useContext } from "react";
import IssueDrawerItem from "./IssueDrawerItem";
import "../../Styles/IssuesDrawer.less";
import HistoryItem from "./ResolutionSelect/HistoryItem";
import { SavedItemsContext, OpenItemsContext } from "./ItemIssues";
import { CreatedIssues } from "./Data/Interfaces";
import { MenuUnfoldOutlined, MenuFoldOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
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
    Divider,
    Tooltip,
    Badge,
    message,
} from "antd";

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

    const itemError = () => {
        message.error({
            className: "item-error",
            content: (
                <Row>
                    <Space direction="vertical">
                        <Col className="item-error__top">
                            <Row>
                                <Space>
                                    <Col className="item-error__icon">
                                        <ExclamationCircleOutlined />
                                    </Col>
                                    <Col>
                                        <Text strong>Item Issues Require Attention</Text>
                                    </Col>
                                </Space>
                            </Row>
                        </Col>
                        <Divider />
                        <Col className="item-error__bottom">
                            <Text className="item-error__tex-error">
                                Item issues have not been saved, created or cancelled. Open drawer to complete actions.
                            </Text>
                        </Col>
                    </Space>
                </Row>
            ),
        });
    };

    return (
        <>
            <Row className="drawer-container">
                <Col className="left-tab">
                    <Row justify="center">
                        {collapsed ? (
                            <Badge count={2}>
                                <MenuFoldOutlined className="left-tab__menu-btn" onClick={() => setCollapsed(false)} />
                            </Badge>
                        ) : (
                            <Badge count={2}>
                                <MenuUnfoldOutlined
                                    className="left-tab__menu-btn"
                                    onClick={() => {
                                        itemError();
                                        setCollapsed(true);
                                    }}
                                />
                            </Badge>
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
                                                    <div className="input-group">
                                                        <TextArea placeholder="Add global comment" rows={1} />
                                                        <Tooltip
                                                            placement="topRight"
                                                            title="Any comment applied here will show in all individual workboxes."
                                                        >
                                                            <InfoCircleOutlined className="info-icon" />
                                                        </Tooltip>
                                                    </div>
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
                        {activeTab === "0" && (
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
                                                    <Button type="primary" danger ghost>
                                                        Cancel All Issue
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button type="primary" ghost>
                                                        Save All for Later
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button className="create-btn" type="primary">
                                                        Create All Issue
                                                    </Button>
                                                </Col>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>
                            </Footer>
                        )}
                    </Col>
                )}
            </Row>
        </>
    );
};

export default IssuesDrawer;
