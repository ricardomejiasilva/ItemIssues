import React, { useEffect, useState } from "react";
import "../../Styles/ItemIssues.less";
import "antd/dist/antd.css";
import itemIssuesFetch from "~/itemIssuesFetch";
import { Row, Col, Input, Button, Space, Form } from "antd";
import parseJsonResponse from "~/parseJsonResponse";
import { ItemToAdd, OrderItemRecord, Inputs } from "./Data/Interfaces";
import BulkModal from "./BulkModal";

interface AddItemRowProps {
    orderItems: OrderItemRecord[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItemRecord[]>>;
}

const AddItemRow = ({ type, issue }: { type: Inputs[]; issue: Inputs[] }) => {
    const [addItemInputValue, setAddItemInputValue] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isItemToAddValid, setIsItemToAddValid] = useState(true);
    const [addItemForm] = Form.useForm();

    const handleAddItemButtonClick = async () => {
        if (addItemInputValue) {
            const result = await parseJsonResponse<ItemToAdd>(
                await itemIssuesFetch(
                    `/api/ItemData/GetItemDataToAdd?itemNumber=${addItemInputValue}`,
                    {}
                )
            );

            setIsItemToAddValid(result.isValid);
        }
        addItemForm.validateFields();
    };

    useEffect(() => {
        if (!addItemInputValue) {
            setIsItemToAddValid(true);
            addItemForm.validateFields();
        }
    }, [addItemInputValue]);

    return (
        <Row justify="space-between">
            <Col>
                <Row>
                    <Form form={addItemForm} layout="horizontal">
                        <Space direction="horizontal" size={16} align="start">
                            <Col>
                                <Form.Item
                                    name="itemToAdd"
                                    rules={[
                                        {
                                            message: "Not a valid item number",
                                            validator: (_, value) => {
                                                if (
                                                    (value &&
                                                        isItemToAddValid) ||
                                                    !value
                                                ) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Add Item #"
                                        value={addItemInputValue}
                                        onChange={(event) =>
                                            setAddItemInputValue(
                                                event.target.value
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        onClick={() =>
                                            handleAddItemButtonClick()
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Space>
                    </Form>
                </Row>
            </Col>
            <Col>
                <Button onClick={() => setIsModalVisible(true)}>
                    Bulk Select
                </Button>
            </Col>
            <BulkModal
                type={type}
                issue={issue}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </Row>
    );
};

export default AddItemRow;
