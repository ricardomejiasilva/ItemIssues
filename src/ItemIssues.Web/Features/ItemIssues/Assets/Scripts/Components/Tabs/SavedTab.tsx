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
    savedItems: any;
    columns: any;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    return (
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
    );
};

export default SavedTab;
