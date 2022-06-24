import React, { useEffect, useState } from "react";
import "../../Styles/ItemIssues.less";
import "antd/dist/antd.css";
import itemIssuesFetch from "~/itemIssuesFetch";
import { Row, Col, Input, Button, Space, Form } from "antd";
import parseJsonResponse from "~/parseJsonResponse";
import { ItemToAdd, OrderItemRecord } from "./Data/Interfaces";

interface AddItemRowProps {
    orderItems: OrderItemRecord[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItemRecord[]>>;
}

const AddItemRow = ({ orderItems, setOrderItems }: AddItemRowProps) => {
    const [addItemInputValue, setAddItemInputValue] = useState<string>("");
    const [isItemToAddValid, setIsItemToAddValid] = useState(true);
    const [addItemForm] = Form.useForm();

    const handleAddItemButtonClick = async () => {
        if (addItemInputValue) {
            const result = await parseJsonResponse<ItemToAdd>(
                await itemIssuesFetch(`/api/ItemData/GetItemDataToAdd?itemNumber=${addItemInputValue}`, {})
            );

            setIsItemToAddValid(result.isValid);

            if (result.isValid) {
                setOrderItems([
                    ...orderItems,
                    {
                        image: result.productImageUrl,
                        itemNumber: addItemInputValue.toUpperCase(),
                        key: (orderItems.length + 1).toString(),
                        name: result.productDescription,
                        price: result.price,
                        warehouse: 0,
                        status: "open",
                        productLink: result.productLink,
                        productDescription: result.productDescription,
                        quantityOrdered: 1,
                        quantitySelected: 1,
                        isExtraItem: true,
                        isDropShip: false,
                        isSpecialOrder: false,
                        selectedType: null,
                        selectedIssue: null,
                    },
                ]);
            }
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
                                                if ((value && isItemToAddValid) || !value) {
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
                                        onChange={(event) => setAddItemInputValue(event.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button htmlType="submit" onClick={() => handleAddItemButtonClick()}>
                                        Add Item
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Space>
                    </Form>
                </Row>
            </Col>
            <Col>
                <Button>Bulk Select</Button>
            </Col>
        </Row>
    );
};

export default AddItemRow;