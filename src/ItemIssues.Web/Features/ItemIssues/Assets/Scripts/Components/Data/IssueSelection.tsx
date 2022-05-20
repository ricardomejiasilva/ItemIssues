export const issueSelection = [
    {
        type: "carrier error",
        subTypes: [
            "Expedited Errors",
            "Damaged",
            "Late",
            "Lost",
            "Misdelivered",
            "Misrouted",
        ],
    },
    {
        type: "plus membership cancellation",
        subTypes: ["Plus Membership Cancellation"],
    },
    {
        type: "product complaints",
        subTypes: [
            "Defective",
            "Foreign Object",
            "Melted",
            "Spoiled",
            "Unhappy w/Quality",
            "Used",
        ],
    },
    {
        type: "standard return",
        subTypes: ["Standard Return"],
    },
    {
        type: "vendor error",
        subTypes: ["Vendor Error"],
    },
    {
        type: "warehouse error",
        subTypes: [
            "Above Quantity",
            "Below Quantity",
            "Expedited Shipping",
            "Missing ",
            "Missing Parts",
            "Wrong Item",
            "Wrong Order",
        ],
    },
    {
        type: "web error",
        subTypes: ["CS Error", "Logistics Error", "Site Issue"],
    },
];
