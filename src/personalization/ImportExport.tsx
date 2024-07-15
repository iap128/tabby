import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, UploadProps, Typography, Flex } from "antd";
import { saveAs } from "file-saver";
import { Config } from "../Config";
import { setCookie } from "typescript-cookie";

const ImportExport = () => {
    const props: UploadProps = {
        name: 'file',
        accept: '.json',
        action: '/upload-do',
        onChange(info) {
            if (info.file.status === 'done') {
                const parsedJSON = JSON.parse(info.file.response) as typeof Config;
                console.log(info.file);

                if (parsedJSON.apiKey) {
                    setCookie('key', parsedJSON.apiKey);
                }
                if (parsedJSON.stationID) {
                    setCookie('id', parsedJSON.stationID);
                }
                if (parsedJSON.weatherZip) {
                    setCookie('zip', parsedJSON.weatherZip);
                }
                if (parsedJSON.links) {
                    setCookie('links', JSON.stringify(parsedJSON.links));
                }
            }
        },
    };

    const importConfig = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const parsedJSON = JSON.parse(e.target?.result as string) as typeof Config;

            if (parsedJSON.apiKey) {
                setCookie('key', parsedJSON.apiKey);
            }
            if (parsedJSON.stationID) {
                setCookie('id', parsedJSON.stationID);
            }
            if (parsedJSON.weatherZip) {
                setCookie('zip', parsedJSON.weatherZip);
            }
            if (parsedJSON.links) {
                setCookie('links', JSON.stringify(parsedJSON.links));
            }
        };
        reader.readAsText(file);
    };

    const exportConfig = () => {
        const file = new Blob([JSON.stringify(Config)], {type: "text/plain;charset=utf-8"});
        saveAs(file, 'tabby-config.json');
    };

    return (
        <Flex vertical gap={10}>
            <Typography.Title level={3}>Tabby Config</Typography.Title>
            <Button icon={<DownloadOutlined />} onClick={exportConfig}>Export Config</Button>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Import Config</Button>
            </Upload>
        </Flex>
    );
};

export default ImportExport;
