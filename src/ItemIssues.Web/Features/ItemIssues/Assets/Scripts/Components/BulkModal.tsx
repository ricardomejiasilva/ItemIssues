import React, { useState } from "react";
import "../../Styles/ItemIssues.less";
import BulkItem from "./BulkItem";
import { issueSelection } from "./Data/IssueSelection";
import { Record } from "./Data/Interfaces";
import { dataSource } from "./Data/ItemData";
import {
    Row,
    Col,
    Space,
    Button,
    Form,
    Select,
    Checkbox,
    Modal,
    Typography,
} from "antd";

const BulkModal = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [type, setType] = useState<string>("");
    const [issue, setIssue] = useState<string>("");

    const { Text } = Typography;
    const { Option } = Select;

    const getSubTypes = (type: string) => {
        const selectedIssue = issueSelection.find((item) => type == item.type);

        if (!selectedIssue) return null;
        return selectedIssue.subTypes.map((value) => {
            return { value };
        });
    };
    return (
        <Modal
            className="bulk-modal"
            title="Bulk Select"
            visible={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
            footer={[
                <Button key="back" onClick={() => setIsModalVisible(false)}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => setIsModalVisible(false)}
                >
                    Create Bulk Issue
                </Button>,
            ]}
        >
            <Space className="full-width" direction="vertical" size={8}>
                <Form layout="horizontal">
                    <Col>
                        <Space
                            className="full-width"
                            direction="vertical"
                            size={8}
                        >
                            <Col>
                                <Text>Select Issue Type</Text>
                            </Col>
                            <Col>
                                <Space size={16}>
                                    <Col>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Must select Issue Type",
                                                },
                                            ]}
                                        >
                                            <Select
                                                className="bulk-modal__select"
                                                placeholder="Select a Type"
                                                labelInValue
                                                onChange={(value) => {
                                                    setType(value.key);
                                                }}
                                            >
                                                <Option
                                                    key="carrier error"
                                                    value="Carrier Error"
                                                >
                                                    Carrier Error
                                                </Option>
                                                <Option
                                                    key="plus membership cancellation"
                                                    value="Plus Membership Cancellation"
                                                >
                                                    Plus Membership Cancellation
                                                </Option>
                                                <Option
                                                    key="product complaints"
                                                    value="Product Complaints"
                                                >
                                                    Product Complaints
                                                </Option>
                                                <Option
                                                    key="standard return"
                                                    value="Standard Return"
                                                >
                                                    Standard Return
                                                </Option>
                                                <Option
                                                    key="vendor error"
                                                    value="Standard Return"
                                                >
                                                    Vendor Error
                                                </Option>
                                                <Option
                                                    key="warehouse error"
                                                    value="Warehouse Error"
                                                >
                                                    Warehouse Error
                                                </Option>
                                                <Option
                                                    key="web error"
                                                    value="Web Error"
                                                >
                                                    Web Error
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Form.Item>
                                            <Select
                                                className="bulk-modal__select"
                                                placeholder="Select an Issue"
                                                labelInValue
                                                onChange={(value) => {
                                                    setIssue(value.key);
                                                }}
                                                options={getSubTypes(type)}
                                            ></Select>
                                        </Form.Item>
                                    </Col>
                                </Space>
                            </Col>
                        </Space>
                    </Col>
                    <Col>
                        <Space direction="vertical" size={0}>
                            <Text>
                                Select Items to Apply Issue Type (0 out of 6
                                items selected)
                            </Text>
                            <Text className="bulk-modal__minimum-items hidden">
                                Must select at least 2 items to Apply Issue Type
                            </Text>
                        </Space>
                    </Col>
                    <Col className="bulk-modal__container">
                        <Row justify="space-between" align="middle">
                            <Col className="bulk-modal__checkbox">
                                <Checkbox
                                    onChange={() => {
                                        setAllSelected((current) => !current);
                                    }}
                                >
                                    Select All
                                </Checkbox>
                            </Col>
                            <Col>
                                <Form.Item
                                    name="filter by warehouse"
                                    label="Filter by Warehouse"
                                    className="filter-by-warehouse"
                                    labelCol={{ span: 13 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Select
                                        className="bulk-modal__view-all"
                                        placeholder="View All"
                                    >
                                        <Option>View All</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            {dataSource.map((item: Record) => (
                                <BulkItem
                                    bulkItem={item}
                                    selected={allSelected}
                                    issue={issue}
                                    type={type}
                                />
                            ))}
                        </Row>
                    </Col>
                </Form>
            </Space>
        </Modal>
    );
};

export default BulkModal;
