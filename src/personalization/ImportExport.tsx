import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, UploadProps } from "antd";

const ImportExport = () => {
    const props: UploadProps = {
        name: 'file',
        accept: '.json',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {

            }
        },
    };

    return (
        <>
            <Button icon={<DownloadOutlined />}>Export Config</Button>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Import Config</Button>
            </Upload>
        </>
    );
};

export default ImportExport;
