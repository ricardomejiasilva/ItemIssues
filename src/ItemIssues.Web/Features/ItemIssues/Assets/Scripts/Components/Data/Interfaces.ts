export interface Record {
    image: string;
    itemNumber: string;
    key: string;
    name: string;
    price: number;
    warehouse: number;
    status: string;
    productLink: string;
    productDescription: string;
    quantityOrdered: number;
    isExtraItem: boolean;
    isDropShip: boolean;
    isSpecialOrder: boolean;
}

export interface CreatedIssues {
    image: string;
    issueSubCategory?: string;
    issueType?: string;
    itemNumber: string;
    key: string;
    name: string;
    price: number;
    quantity?: number;
    status?: string;
    resolution?: string;
}

export interface Value {
    label: string;
    value: string;
    key: string;
    disabled: boolean;
}

export interface ItemIssuesOrderData {
    order: Order;
    orderItems: OrderItem[];
    numberOfUniqueItems: number;
    errorMessage: string;
    errors: any;
}

export interface Order {
    orderNumber: number;
    customerLocation: number;
    zeroDollarOrderFor: number;
    shippingMethod: string;
    orderStatus: string;
    customerEmail: string;
}

export interface OrderItem {
    itemNumberId: number;
    itemNumber: string;
    quantityOrdered: number;
    pricePaid: number;
    upsShipType: string;
    shippedFromLocation: number;
    productImageUrl: string;
    productDescription: string;
    productLink: string;
    isDropShip: boolean;
    isSpecialOrder: boolean;
}

export interface IssueTypeDescription {
    issueTypeId: number;
    categoryName: string;
    typeName: string;
    typeDescription: string;
}

export interface ItemToAdd {
    itemNumber: string;
    productImageUrl: string;
    productDescription: string;
    productLink: string;
    price: number;
    isValid: boolean;
}
