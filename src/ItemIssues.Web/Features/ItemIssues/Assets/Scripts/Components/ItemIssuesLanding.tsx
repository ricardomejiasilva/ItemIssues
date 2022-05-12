import React from "react";
import "antd/dist/antd.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Typography, Row, Col, Input, Button, Space } from "antd";

const ItemIssuesLanding = (): JSX.Element => {
    const { Title, Text } = Typography;
    return (
        <div>
            <Row>
                <Col>
                    <Title
                        level={3}
                        style={{ margin: 0, paddingBottom: 6, paddingTop: 24 }}
                    >
                        Welcome to Item Issues
                    </Title>
                </Col>
            </Row>
            <Space direction="vertical" size={24}>
                <Row>
                    <Col>
                        <Text>
                            Enter Order Number to View or Create Item Issues
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Space size={16}>
                        <Col>
                            <Input placeholder="Enter Oder #"></Input>
                        </Col>
                        <Col>
                            <Button type="primary">
                                Continue <ArrowRightOutlined />
                            </Button>
                        </Col>
                    </Space>
                </Row>
            </Space>
        </div>
    );
};

export default ItemIssuesLanding;
