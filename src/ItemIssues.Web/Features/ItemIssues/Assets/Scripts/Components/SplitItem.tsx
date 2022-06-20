import React, { useState } from "react";
import "../../Styles/ItemIssues.less";
import { dataSource } from "./Data/ItemData";
import { Col, Tag, Select, Space } from "antd";

const SplitItem = () => {
    const { Option } = Select;
    const [splitType, setSplitType] = useState("");
    console.log(splitType);

    return (
        <Space className="split-item-container">
            <Col>
                <div className="item-details">
                    <div>
                        <Tag className="item-details__tag">
                            <img src={dataSource[0].image} alt="item" />
                        </Tag>
                    </div>
                    <div className="item-details__description">
                        <a href="/">{dataSource[0].name}</a>
                        <p>Item # {dataSource[0].itemNumber}</p>
                    </div>
                </div>
            </Col>
            <Col>
                <Select placeholder="1">
                    <Option>0</Option>
                    <Option>1</Option>
                    <Option>2</Option>
                </Select>
            </Col>
            <Col>
                <Select
                    placeholder="Select a Type"
                    className="item-type"
                    onChange={(value) => {
                        setSplitType(value);
                    }}
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
                    <Option key="product complaints" value="Product Complaints">
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
                    placeholder="Select an Issue"
                    labelInValue
                    className="item-issue"
                    disabled={splitType.length > 1 ? false : true}
                />
            </Col>
        </Space>
    );
};

export default SplitItem;
