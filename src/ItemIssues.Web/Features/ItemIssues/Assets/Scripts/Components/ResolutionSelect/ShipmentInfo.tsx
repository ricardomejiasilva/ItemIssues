/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from "react";
import "../../../Styles/IssueDrawerItem.less";
import { Row, Col, Typography, Space, Alert, Button } from "antd";
const ShipmentInfo = (): JSX.Element => {
    const { Title, Text } = Typography;
    const today = new Date().toLocaleDateString().replace(/\//g, "-");
    const [emailSent, setEmailSent] = useState<boolean>(false);

    return (
        <>
            <Row className="shipment-info">
                <Col>
                    <Row className="shipment-info__top-section">
                        <Col>
                            <Row>
                                <Title level={5}>Ground Shipment</Title>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Space direction="vertical" size={6}>
                                        <Row>
                                            <Text strong>Carrier Email:</Text>
                                        </Row>
                                        <Row>
                                            <Text strong>Tracking Number:</Text>
                                        </Row>
                                    </Space>
                                </Col>

                                <Col span={12}>
                                    <Space direction="vertical" size={6}>
                                        <Row>
                                            <a href="/">
                                                dedicatedcare@fedex.com
                                            </a>
                                        </Row>
                                        <Row>
                                            <a href="/">
                                                282220861202, 282220872004,
                                                282220881178, 282220995247,
                                                282221095547
                                            </a>
                                        </Row>
                                    </Space>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Space direction="vertical" size={6}>
                                        <Row>
                                            <Text strong>Carrier Name:</Text>
                                        </Row>
                                        <Row>
                                            <Text strong>
                                                Carrier Account Number:
                                            </Text>
                                        </Row>
                                    </Space>
                                </Col>

                                <Col span={12}>
                                    <Space direction="vertical" size={6}>
                                        <Row>
                                            <a href="/">FedEx</a>
                                        </Row>
                                        <Row>
                                            <a href="/">339973245</a>
                                        </Row>
                                    </Space>
                                </Col>
                            </Row>
                            <Row>
                                <Text className="shipment-info__trace-item">
                                    I would like to start a trace for the items
                                    below.
                                </Text>
                            </Row>
                        </Col>
                    </Row>

                    <Row
                        className="shipment-info__middle-section"
                        gutter={[16, 0]}
                    >
                        <Row>
                            <Col>
                                <Title level={5}>Oder Detail</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <Space direction="vertical" size={6}>
                                    <Row>
                                        <Text strong>Order #:</Text>
                                    </Row>
                                    <Row>
                                        <Text strong>Email:</Text>
                                    </Row>
                                    <Row>
                                        <Text strong>Name:</Text>
                                    </Row>
                                    <Row>
                                        <Text strong>Address:</Text>
                                    </Row>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction="vertical" size={6}>
                                    <Row>
                                        <a href="/">67612462</a>
                                    </Row>
                                    <Row>
                                        <Text>
                                            tlatshaw@webstauranststore.com
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text>Tyler Latshaw</Text>
                                    </Row>
                                    <Row>
                                        <Text>
                                            A3786 Clearwater Lane Brookhaven, PA
                                            19015-2603 6109843003
                                        </Text>
                                    </Row>
                                </Space>
                            </Col>
                        </Row>
                    </Row>

                    <Row
                        className="shipment-info__bottom-section"
                        justify="space-between"
                    >
                        <Col>
                            <Row>
                                <Title level={5}>Shipment Information</Title>
                            </Row>

                            <Space direction="vertical" size={24}>
                                <Row className="shipment-info__item-info">
                                    <Col span={12}>
                                        <Row>
                                            <Text>Item # 267780814</Text>
                                        </Row>
                                        <Row>
                                            <Text>
                                                Acopa Harmony 9 3/8 18/8
                                                Stainless Steel Extra Heavy
                                                Weight Steak Knife - 12/Case
                                            </Text>
                                        </Row>
                                    </Col>

                                    <Col span={12}>
                                        <Row gutter={[8, 4]}>
                                            <Col
                                                span={8}
                                                className="shipment-info__text-align-center"
                                            >
                                                <Text strong>Quanitity</Text>
                                            </Col>
                                            <Col span={8}>
                                                <Text strong>Total Weight</Text>
                                            </Col>
                                            <Col
                                                span={8}
                                                className="shipment-info__text-align-center"
                                            >
                                                <Text strong>Total Cost</Text>
                                            </Col>
                                        </Row>
                                        <Row justify="space-between">
                                            <Col
                                                span={8}
                                                className="shipment-info__text-align-center"
                                            >
                                                <Text>1</Text>
                                            </Col>
                                            <Col
                                                span={8}
                                                className="shipment-info__text-align-center"
                                            >
                                                <Text>13.500</Text>
                                            </Col>
                                            <Col
                                                span={8}
                                                className="shipment-info__text-align-center"
                                            >
                                                <Text>$31.86</Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Row>
                                            <Text>Thanks</Text>
                                        </Row>
                                        <Row>
                                            <Text strong>
                                                Thanks, Customer Support @
                                                WebstaurantStore
                                            </Text>
                                        </Row>
                                        <Row>
                                            <Text strong>
                                                www.webstaurantstore.com
                                            </Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Button
                            onClick={() => setEmailSent(!false)}
                            type="primary"
                            className={emailSent && "hidden"}
                        >
                            Email Carrier
                        </Button>
                        <Alert
                            message={
                                "Email Successfully sent to Carrier, " + today
                            }
                            type="success"
                            className={!emailSent && "hidden"}
                            showIcon
                        />
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ShipmentInfo;
