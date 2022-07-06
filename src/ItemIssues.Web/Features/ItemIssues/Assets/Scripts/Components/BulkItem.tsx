import React, { useEffect, useState } from "react";
import "../../Styles/ItemIssues.less";
import {
    Row,
    Col,
    Space,
    Select,
    Checkbox,
    Typography,
    Tag,
    Popconfirm,
} from "antd";
import { Inputs, Record } from "./Data/Interfaces";

const BulkItem = ({
    bulkItem,
    selected,
    index,
    type,
    issue,
    bulkType,
    bulkIssue,
    isModalVisible,
}: {
    bulkItem: Record;
    selected: boolean;
    index: number;
    type: Inputs[];
    issue: Inputs[];
    bulkType: string;
    bulkIssue: string;
    isModalVisible: boolean;
}) => {
    const { Text } = Typography;
    const { Option } = Select;
    const [checked, setCheked] = useState<boolean>(false);
    const [popDisabled, setPopDisabled] = useState<boolean>(true);
    const [defaultType, setDefaultType] = useState<string>("Select a Type");
    const [defaultIssue, setDefaultIssue] = useState<string>("Select an Issue");

    const capitalize = (val: string) => {
        return val.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    const setInput = () => {
        type.some((item) => {
            if (parseInt(item.id) === index + 1) setDefaultType(item.value);
        });
        issue.some((item) => {
            if (parseInt(item.id) === index + 1) setDefaultIssue(item.value);
        });

        if (!type.some((item) => parseInt(item.id) === index + 1))
            setDefaultType("Select a Type");

        if (!issue.some((item) => parseInt(item.id) === index + 1))
            setDefaultIssue("Select an Issue");
    };

    const typeCheck = () => {
        if (checked && bulkType.length > 1)
            setDefaultType(capitalize(bulkType));
        if (checked && bulkIssue.length > 1)
            setDefaultType(capitalize(bulkIssue));
        if (type.some((item) => parseInt(item.id) === index + 1))
            setPopDisabled(false);

        setCheked((current) => !current);
    };

    useEffect(() => {
        if (checked && bulkType.length > 1)
            setDefaultType(capitalize(bulkType));
        if (checked && bulkIssue.length > 1)
            setDefaultIssue(capitalize(bulkIssue));
        if (checked) {
            setPopDisabled(true);
        }
        if (!checked) {
            setInput();
        }
    }, [checked]);

    useEffect(() => {
        setInput();
        typeCheck();
    }, [isModalVisible]);

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
                            <Popconfirm
                                title="Are you sure you want to override
                                this item with a new Issue Type?"
                                okText="Override"
                                cancelText="Cancel"
                                disabled={popDisabled}
                                onConfirm={typeCheck}
                            >
                                <Checkbox
                                    checked={checked}
                                    onClick={() => {
                                        popDisabled &&
                                            setCheked((current) => !current);
                                    }}
                                />
                            </Popconfirm>
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
                        placeholder={defaultType}
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
                        placeholder={defaultIssue}
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
