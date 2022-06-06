import "../../Styles/IssueDrawerItem.less";
import "../../Styles/ItemIssues.less";
import React, { useState, useContext } from "react";
import { CalculatorFilled } from "@ant-design/icons";
import { dataSource } from "./Data/ItemData";
import ResolutionOption from "./ResolutionSelect/ResolutionOption";
import ShipmentInfo from "./ResolutionSelect/ShipmentInfo";
import { AlignType } from "rc-table/lib/interface";
import {
    StateContext,
    SavedItemsContext,
    OpenItemsContext,
    ClosedItemsContext,
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

const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;

const IssueDrawerItem = ({
    index,
    itemType,
}: {
    index: number;
    itemType: any;
}): JSX.Element => {
    const createdIssues = useContext(StateContext);
    const [resolution, setResolution] = useState<string>("");
    const [convertedValue, setConvertedValue] = useState(
        createdIssues[index].price
    );
    const [openPanel, setOpenPanel] = useState<string[] | number[]>(["1"]);
    const [isOpen, setIsOpen] = useState(true);
    const { savedItems, setSavedItems } = useContext(SavedItemsContext);
    const { openItems, setOpenItems } = useContext(OpenItemsContext);
    const { closedItems, setClosedItems } = useContext(ClosedItemsContext);

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
                <div className="item-details">
                    <div>
                        <Tag className="item-details__tag">
                            <img src={itemType[index].image} alt="item" />
                        </Tag>
                    </div>
                    <div className="tem-details__description">
                        <a href="/">{itemType[index].name}</a>
                        <p>{itemType[index].itemNumber}</p>
                    </div>
                </div>
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
        state: any,
        stateString: string,
        updateState: any
    ) => {
        dataSource.forEach((item) => {
            if (item.key === createdIssues[index].key) {
                item.status = stateString;
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
                                {itemType.status === "saved" && (
                                    <Tag
                                        className="drawer-item__saved-tag"
                                        color="gold"
                                    >
                                        Saved
                                    </Tag>
                                )}
                                {itemType.status === "open" && (
                                    <Tag
                                        className="drawer-item__open-tag"
                                        color="green"
                                    >
                                        Open
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
                        <Row className="drawer-item__resolution">
                            <Col>
                                <Row>
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 16 }}
                                        initialValues={{ remember: true }}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Resolution"
                                            className="drawer-item__resolution-input"
                                            wrapperCol={{
                                                span: 30,
                                            }}
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
                                                onSelect={(value: string) => {
                                                    setResolution(value);
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
                                    </Form>
                                </Row>
                                <Row>
                                    {resolution.length > 1 && (
                                        <ResolutionOption
                                            resolution={resolution}
                                            index={index}
                                        />
                                    )}
                                </Row>
                            </Col>
                            <Col>
                                {resolution === "store credit" && (
                                    <ShipmentInfo />
                                )}
                            </Col>
                        </Row>
                        <Row className="action-btns">
                            <Space size={16}>
                                <Col>
                                    <Button
                                        onClick={() =>
                                            addItemState(
                                                closedItems,
                                                "closed",
                                                setClosedItems
                                            )
                                        }
                                    >
                                        Cancel Issue
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() =>
                                            addItemState(
                                                savedItems,
                                                "saved",
                                                setSavedItems
                                            )
                                        }
                                        type="primary"
                                        ghost
                                    >
                                        Save for Later
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() =>
                                            addItemState(
                                                openItems,
                                                "open",
                                                setOpenItems
                                            )
                                        }
                                        type="primary"
                                    >
                                        Create Issue
                                    </Button>
                                </Col>
                            </Space>
                        </Row>
                    </Panel>
                </Collapse>
            </Row>
        </>
    );
};

export default IssueDrawerItem;
