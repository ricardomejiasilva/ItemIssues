import React from "react";
import "../../../Styles/ItemIssues.less";
import { Record, Inputs } from "../Data/Interfaces";
import { Table, Row, Col, Spin, Space, Button, Form, Input } from "antd";

const ItemsTab = ({
    issue,
    dataSource,
    columns,
}: {
    issue: any;
    dataSource: any;
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
                                rowClassName={(record: Record) => {
                                    let rowColor;
                                    if (
                                        issue.length > 0 &&
                                        issue.some(
                                            (item: Inputs) =>
                                                record.key === item.id
                                        )
                                    )
                                        rowColor = "highlighted";
                                    if (
                                        dataSource.some((item: Record) => {
                                            if (
                                                item.key === record.key &&
                                                item.status.length > 1
                                            )
                                                return true;
                                        })
                                    )
                                        rowColor = "disabled";
                                    return rowColor;
                                }}
                                pagination={false}
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </Spin>
                    </Col>
                </Row>
            </Col>
        </Space>
    );
};

export default ItemsTab;
