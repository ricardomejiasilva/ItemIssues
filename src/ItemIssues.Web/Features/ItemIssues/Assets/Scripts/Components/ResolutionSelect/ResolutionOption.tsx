/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import "../../../Styles/PaymentCredit.less";
import { Input, Form, Checkbox, Typography, Space, Alert, Popover } from "antd";
import { InfoCircleFilled, InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { TextArea } = Input;

const ResolutionOption = ({
    resolution,
}: {
    resolution: string;
}): JSX.Element => {
    return (
        <>
            <Form colon={false} className="resolutions">
                <Form.Item
                    name="return item"
                    label="Return Item"
                    className={
                        resolution !== "payment credit"
                            ? "return-item hidden"
                            : "return-item"
                    }
                >
                    <Checkbox />
                </Form.Item>
                <Form.Item
                    labelAlign="right"
                    name="refund check"
                    className={
                        resolution !== "payment credit"
                            ? "refund-check hidden"
                            : "refund-check"
                    }
                    label={
                        <p className="resolutions__label">
                            Refund Check
                            <br />
                            ($100 Minimum)
                        </p>
                    }
                >
                    <Checkbox disabled />
                </Form.Item>
                <Form.Item className="amount" label="Amount">
                    <Input disabled addonBefore="$" defaultValue="$34.39" />
                </Form.Item>
                <Form.Item
                    className="inconvenience-credit"
                    label="Inconvenience Credit"
                >
                    <Input addonBefore="$" defaultValue="$0.00" />
                </Form.Item>
                <Form.Item className="shipping" label="Shipping">
                    <Input addonBefore="$" defaultValue="$0.00" />
                </Form.Item>
                <Form.Item className="tax" label="Tax">
                    <Input disabled addonBefore="$" defaultValue="$0.00" />
                </Form.Item>
                <Form.Item
                    name="return item"
                    className={
                        resolution !== "store credit"
                            ? "return-item hidden"
                            : "return-item"
                    }
                >
                    <Checkbox>Return Item</Checkbox>
                    <Popover
                        className="resolutions__popover"
                        content="Return will always be created for Carrier > Lost, so the warehouse can keep track of the item(s) if they’re found and returned by carrier."
                    >
                        <InfoCircleOutlined />
                    </Popover>
                </Form.Item>
                {resolution == "store credit" && (
                    <Alert
                        message="A Credit Due: No return will be automatically created."
                        type="error"
                        showIcon
                        className="resolutions__alert"
                        icon={<InfoCircleFilled />}
                    />
                )}

                <Space direction="vertical" size={20} style={{ width: "100%" }}>
                    <Text strong>
                        Total Payment Credit
                        <span className="resolutions__credit-amount">
                            $34.39
                        </span>
                    </Text>
                    <Form.Item className="comment" required label="Comments">
                        <TextArea />
                    </Form.Item>
                </Space>
            </Form>
        </>
    );
};

export default ResolutionOption;
