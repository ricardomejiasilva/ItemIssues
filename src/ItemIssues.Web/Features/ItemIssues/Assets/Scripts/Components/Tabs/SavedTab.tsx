import React from "react";
import "../../../Styles/ItemIssues.less";
import { Table, Row, Col, Spin, Space, Button, Form, Input } from "antd";

interface Input {
    id: string;
    key: string;
    value: string;
}

const SavedTab = ({
    issue,
    savedItems,
    columns,
}: {
    issue: any;
    savedItems: any;
    columns: any;
}): JSX.Element => {
    return (
        <Space direction="vertical" size={16} className="full-width">
            <Col>
                <Row justify="space-between">
                    <Col>
                        <Row>
                            <Space
                                direction="horizontal"
                                className="add-item"
                                size={16}
                            >
                                <Col>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Must enter item number to add item",
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
                                rowClassName={(record) => {
                                    if (
                                        issue.length > 0 &&
                                        issue.some(
                                            (item: Input) =>
                                                record.key === item.id
                                        )
                                    )
                                        return "highlighted";
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
