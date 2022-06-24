import React, { SetStateAction, useEffect, useState } from "react";
import "../../Styles/ItemIssues.less";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Row, Col, Space, Select, Checkbox, Typography, Tag } from "antd";
import { Record } from "./Data/Interfaces";

const BulkItem = ({
    bulkItem,
    selected,
    type,
    issue,
}: {
    bulkItem: Record;
    selected: boolean;
    type: string;
    issue: string;
}) => {
    const { Text } = Typography;
    const { Option } = Select;
    const [checked, setCheked] = useState<boolean>(false);
    const onChange = (e: CheckboxChangeEvent) => {
        setCheked(e.target.checked);
    };

    function capitalize(val: string) {
        return val.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    useEffect(() => {
        setCheked(selected);
    }, [selected]);

    return (
        <Row
            justify="space-between"
            className={
                checked
                    ? "bulk-modal__item full-width highlighted"
                    : "bulk-modal__item full-width"
            }
        >
            <Col>
                <Row className="item-details">
                    <Space size={16}>
                        <Col>
                            <Checkbox checked={checked} onChange={onChange} />
                        </Col>
                        <Col>
                            <Tag className="item-details__tag">
                                <img src={bulkItem.image} alt="item" />
                            </Tag>
                        </Col>
                        <Col className="item-details__description">
                            <Space direction="vertical" size={0}>
                                <a href="/">{bulkItem.name}</a>
                                <Text>Item # {bulkItem.itemNumber}</Text>
                            </Space>
                        </Col>
                    </Space>
                </Row>
            </Col>
            <Col>872</Col>
            <Space size={16}>
                <Col>
                    <Select
                        placeholder={
                            checked && type.length > 1
                                ? capitalize(type)
                                : "Select an Type"
                        }
                        className="item-type"
                        disabled
                    >
                        <Option key="carrier error" value="Carrier Error">
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
                        <Option key="standard return" value="Standard Return">
                            Standard Return
                        </Option>
                        <Option key="vendor error" value="Standard Return">
                            Vendor Error
                        </Option>
                        <Option key="warehouse error" value="Warehouse Error">
                            Warehouse Error
                        </Option>
                        <Option key="web error" value="Web Error">
                            Web Error
                        </Option>
                    </Select>
                </Col>
                <Col>
                    <Select
                        placeholder={
                            checked && issue.length > 1
                                ? issue
                                : "Select an Issue"
                        }
                        labelInValue
                        className="item-issue"
                        disabled
                    />
                </Col>
            </Space>
        </Row>
    );
};

export default BulkItem;
