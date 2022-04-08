import React, { useState, useEffect } from "react";
import { Button, Input, Space, Table } from "antd";
import "../../Styles/Sample.less";
import itemIssuesFetch from "~/itemIssuesFetch";
import parseJsonResponse from "~/parseJsonResponse";

interface SampleData {
    id: number;
    name: string;
}

const SampleComponent = (): JSX.Element => {
    const [sampleText, setSampleText] = useState("Hello World!");
    const [sampleData, setSampleData] = useState<SampleData[]>([]);

    const onButtonClick = (): void => {
        alert(sampleText);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setSampleText(value);
    };

    const getSampleData = async (): Promise<void> => {
        try {
            const response = await parseJsonResponse<SampleData[]>(
                await itemIssuesFetch("/DevTools/Sample/GetSampleData", null)
            );
            setSampleData(response);
        } catch (error) {
            console.error("Error Loading Roles");
        }
    };

    const saveSampleData = async (): Promise<void> => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sampleData: sampleData,
            }),
        };
        try {
            const successful = await parseJsonResponse<boolean>(
                await itemIssuesFetch(
                    "/DevTools/Sample/SaveSampleData",
                    requestOptions
                )
            );
            if (successful) {
                alert("Save Successful");
            }
        } catch (error) {
            alert("Save Failed");
        }
    };

    useEffect(() => {
        getSampleData();
    }, []);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
    ];

    return (
        <Space direction="vertical">
            <Input
                value={sampleText}
                onChange={handleTextChange}
                className="sample-input"
            />
            <Button type="primary" onClick={onButtonClick}>
                Submit
            </Button>
            <Table
                className="sample-table"
                dataSource={sampleData}
                columns={columns}
            />
            <Button type="primary" onClick={saveSampleData}>
                Test Save
            </Button>
        </Space>
    );
};

export default SampleComponent;
