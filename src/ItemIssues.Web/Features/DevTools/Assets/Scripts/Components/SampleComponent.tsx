import React, { useState, useEffect } from "react";
import { Button, Input, Space, Table } from "antd";
import "../../Styles/Sample.less";
import itemIssuesFetch from "~/itemIssuesFetch";
import parseJsonResponse from "~/parseJsonResponse";

interface SampleData {
    id: number;
    name: string;
}

const SampleComponent = () => {
    const [sampleText, setSampleText] = useState('Hello World!');
    const [sampleData, setSampleData] = useState<SampleData[]>([]);

    const onButtonClick = () => {
        alert(sampleText);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSampleText(value);
    };

    const getSampleData = async (): Promise<void> => {
        try {
            const response = await parseJsonResponse<SampleData[]>(
                await itemIssuesFetch(
                    "/DevTools/Sample/GetSampleData",
                    null
                )
            );
            setSampleData(response);
        } catch (error) {
            console.error("Error Loading Roles");
        }
    };

    useEffect(() => {
        getSampleData();
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }
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
        </Space>
    );
};

export default SampleComponent;
