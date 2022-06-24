import "../../Styles/IssueDrawerItem.less";
import "../../Styles/ItemIssues.less";
import React, { useState, useContext } from "react";
import { CalculatorFilled } from "@ant-design/icons";
import { dataSource } from "./Data/ItemData";
import ResolutionOption from "./ResolutionSelect/ResolutionOption";
import ShipmentInfo from "./ResolutionSelect/ShipmentInfo";
import { AlignType } from "rc-table/lib/interface";
import { CreatedIssues } from "../Interface";
import {
    StateContext,
    SavedItemsContext,
    OpenItemsContext,
    CanceledItemsContext,
} from "./ItemIssues";
import {
    Row,
    Col,
    Collapse,
    Tag,
    Spin,
    Table,
    Select,
    Input,
    Button,
    Form,
    Space,
    notification,
    Typography,
} from "antd";

interface TrackedIssues {
    image: string;
    issueSubCategory: string;
    issueType: string;
    itemNumber: string;
    key: string;
    name: string;
    price: number;
    quantity: number;
    resolution: string;
    status: string;
    warehouse: number;
}

const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;

const IssueDrawerItem = ({
    index,
    itemType,
}: {
    index: number;
    itemType: CreatedIssues[];
}): JSX.Element => {
    const createdIssues = useContext(StateContext);
    const { savedItems, setSavedItems } = useContext(SavedItemsContext);
    const { openItems, setOpenItems } = useContext(OpenItemsContext);
    const { canceledItems, setCanceledItems } =
        useContext(CanceledItemsContext);
    const [resolution, setResolution] = useState<string>("");
    const [convertedValue, setConvertedValue] = useState(
        createdIssues[index].price
    );
    const [openPanel, setOpenPanel] = useState<string[] | number[]>(["1"]);
    const [isOpen, setIsOpen] = useState(true);
    const itemSource = dataSource.find(
        (item) => item.key === createdIssues[index].key
    );

    const convertCurrency = (value: string, amount: number) => {
        if (value === "$") setConvertedValue(amount);
        if (value === "€")
            setConvertedValue(Math.ceil(amount * 0.95 * 100) / 100);
    };

    const notify = (state: string) => {
        notification.success({
            message: `Item Issue Successfully ${state}`,
            description: `Your item issues have been successfully ${state}`,
        });
    };

    const selectBefore = (
        <Select
            onChange={(value) =>
                convertCurrency(value, createdIssues[index].price)
            }
            defaultValue="$"
            className="select-before"
        >
            <Option value="$">$</Option>
            <Option value="€">€</Option>
        </Select>
    );

    const columns = [
        {
            title: "Item",
            dataIndex: "name",
            key: "name",
            render: () => (
                <Row className="item-details">
                    <Space size={16}>
                        <Col>
                            <Tag className="item-details__tag">
                                <img src={itemType[index].image} alt="item" />
                            </Tag>
                        </Col>
                        <Col className="item-details__description">
                            <Space direction="vertical" size={0}>
                                <a href="/">{itemType[index].name}</a>
                                <Text>Item # {itemType[index].itemNumber}</Text>
                            </Space>
                        </Col>
                    </Space>
                </Row>
            ),
        },
        {
            title: "Warehouse",
            dataIndex: "warehouse",
            key: "warehouse",
            align: "center" as AlignType,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            align: "center" as AlignType,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: () => (
                <Input
                    className="price-input"
                    addonBefore={selectBefore}
                    addonAfter={<CalculatorFilled className="calc-btn" />}
                    value={convertedValue}
                />
            ),
        },
    ];

    const addItemState = (
        state: TrackedIssues[],
        stateString: string,
        updateState: React.Dispatch<React.SetStateAction<CreatedIssues[]>>
    ) => {
        dataSource.forEach((item) => {
            if (item.key === createdIssues[index].key) {
                item.status = stateString;
                item.resolution = resolution;
            }
        });
        createdIssues[index].status = stateString;
        updateState([...state, createdIssues[index]]);
        notify(stateString);
        setOpenPanel(isOpen ? null : ["1"]);
        setIsOpen(false);
    };

    const handlePanelChange = () => {
        setOpenPanel(isOpen ? null : ["1"]);
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Row className="drawer-item">
                <Collapse
                    onChange={handlePanelChange}
                    activeKey={openPanel}
                    destroyInactivePanel={true}
                >
                    <Panel
                        header={
                            <>
                                <Text strong>
                                    {itemType[index].issueType +
                                        " > " +
                                        itemType[index].issueSubCategory}
                                </Text>
                                {itemType[index].status === "saved" && (
                                    <Tag
                                        className="drawer-item__saved-tag"
                                        color="gold"
                                    >
                                        Saved
                                    </Tag>
                                )}
                                {itemType[index].status === "open" && (
                                    <Tag
                                        className="drawer-item__open-tag"
                                        color="green"
                                    >
                                        Open
                                    </Tag>
                                )}
                                {itemType[index].status === "canceled" && (
                                    <Tag className="drawer-item__canceled-tag">
                                        Canceled
                                    </Tag>
                                )}
                            </>
                        }
                        key="1"
                    >
                        <Row className="drawer-item__item-table">
                            <Spin spinning={false}>
                                <Table
                                    pagination={false}
                                    columns={columns}
                                    dataSource={[itemType[index]]}
                                />
                            </Spin>
                        </Row>
                        <Row>
                            <Col>
                                <Form
                                    name="resolution-form"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                >
                                    <Row className="drawer-item__resolution">
                                        <Space direction="vertical" size={-2}>
                                            <Form.Item
                                                name="resolution"
                                                label="Resolution"
                                                className="drawer-item__resolution-input"
                                                labelCol={{ span: 13 }}
                                                wrapperCol={{ span: 16 }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Must select resolution to create issue",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    placeholder="Select Resolution"
                                                    className="drawer-item__resolution-select"
                                                    disabled={
                                                        itemSource.status ===
                                                        "canceled"
                                                    }
                                                    defaultValue={
                                                        itemSource.resolution
                                                            .length > 1
                                                            ? itemSource.resolution
                                                            : null
                                                    }
                                                    onSelect={(
                                                        value: string
                                                    ) => {
                                                        setResolution(value);
                                                        dataSource.map(
                                                            (item) => {
                                                                if (
                                                                    item.key ===
                                                                    createdIssues[
                                                                        index
                                                                    ].key
                                                                )
                                                                    return (item.resolution =
                                                                        value);
                                                            }
                                                        );
                                                    }}
                                                >
                                                    <Option value="payment credit">
                                                        Payment Credit
                                                    </Option>
                                                    <Option value="store credit">
                                                        Store Credit
                                                    </Option>
                                                    <Option value="0 order">
                                                        $0 Order
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                            {itemSource.resolution.length >
                                                1 && (
                                                <ResolutionOption
                                                    itemSource={itemSource}
                                                    index={index}
                                                />
                                            )}
                                        </Space>
                                    </Row>
                                    <Row className="action-btns">
                                        <Space size={16}>
                                            <Form.Item>
                                                <Button
                                                    onClick={() =>
                                                        addItemState(
                                                            canceledItems,
                                                            "canceled",
                                                            setCanceledItems
                                                        )
                                                    }
                                                    htmlType="submit"
                                                >
                                                    Cancel Issue
                                                </Button>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button
                                                    onClick={() =>
                                                        addItemState(
                                                            savedItems,
                                                            "saved",
                                                            setSavedItems
                                                        )
                                                    }
                                                    type="primary"
                                                    htmlType="submit"
                                                    ghost
                                                >
                                                    Save for Later
                                                </Button>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button
                                                    onClick={() =>
                                                        addItemState(
                                                            openItems,
                                                            "open",
                                                            setOpenItems
                                                        )
                                                    }
                                                    type="primary"
                                                    htmlType="submit"
                                                >
                                                    Create Issue
                                                </Button>
                                            </Form.Item>
                                        </Space>
                                    </Row>
                                </Form>
                            </Col>
                            <Col>
                                {itemSource.resolution === "store credit" && (
                                    <ShipmentInfo />
                                )}
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </Row>
        </>
    );
};

export default IssueDrawerItem;
