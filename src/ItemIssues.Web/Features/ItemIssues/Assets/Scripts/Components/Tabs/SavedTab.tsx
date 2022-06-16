import React from "react";
import "../../../Styles/ItemIssues.less";
import { Table, Row, Col, Spin, Space, Button, Form, Input } from "antd";

interface Input {
    id: string;
    key: string;
    value: string;
}

const SavedTab = ({
    savedItems,
    columns,
    setCollapsed,
}: {
    issue: any;
    savedItems: any;
    columns: any;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    return (
        <Space direction="vertical" size={16} className="full-width">
            <Col>
                <Row justify="space-between">
                    <Col>
                        <Row>
                            <Space direction="horizontal" className="add-item" size={16}>
                                <Col>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Must enter item number to add item",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Add Item #" />
                                    </Form.Item>
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
            </Col>
            <Col>
                <Row>
                    <Col span={24}>
                        <Spin spinning={false}>
                            <Table
                                rowClassName="pointer"
                                onRow={() => {
                                    return {
                                        onClick: () => setCollapsed(false),
                                    };
                                }}
                                pagination={false}
                                columns={columns}
                                dataSource={savedItems}
                            />
                        </Spin>
                    </Col>
                </Row>
            </Col>
        </Space>
    );
};

export default SavedTab;
