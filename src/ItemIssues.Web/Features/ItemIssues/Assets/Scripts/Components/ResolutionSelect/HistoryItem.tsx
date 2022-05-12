import React from "react";
import { Row, Col, Typography, Space } from "antd";

const { Text } = Typography;

const HistoryItem = (): JSX.Element => {
    return (
        <>
            <Col className="history-container__item">
                <Space direction="vertical" size={12}>
                    <Row>
                        <Text>Closed on 03-04-21 6:00:35</Text>
                    </Row>
                    <Row align="middle">
                        <Space size={12}>
                            <Col>
                                <img
                                    src="https://i.postimg.cc/YqWptZnF/Rectangle-3.png"
                                    alt="guy"
                                />
                            </Col>
                            <Col className="history-container__description">
                                <Space direction="vertical" size={3}>
                                    <Row>
                                        <Text strong>Leroy Gibbs</Text>
                                    </Row>
                                    <Row>
                                        <Text type="secondary">
                                            03-04-2021 6:00 AM
                                        </Text>
                                    </Row>
                                </Space>
                            </Col>
                        </Space>
                    </Row>
                </Space>
            </Col>
        </>
    );
};

export default HistoryItem;
