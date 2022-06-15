export interface Record {
    image: string;
    itemNumber: string;
    key: string;
    name: string;
    price: number;
    warehouse?: number;
    resolution?: string;
    status?: string;
}

export interface CreatedIssues extends Record {
    issueSubCategory?: string;
    issueType?: string;
    quantity?: number;
}
