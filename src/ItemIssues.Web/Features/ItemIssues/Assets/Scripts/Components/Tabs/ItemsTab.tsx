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
        <Row>
            <Col span={24}>
                <Spin spinning={false}>
                    <Table
                        rowClassName={(record: Record) => {
                            let rowColor;
                            if (
                                issue.length > 0 &&
                                issue.some(
                                    (item: Inputs) => record.key === item.id
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
    );
};

export default ItemsTab;
