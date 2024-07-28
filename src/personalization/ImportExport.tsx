import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Typography, Flex } from 'antd';
import { saveAs } from 'file-saver';
import { Config } from '../Config';
import { setCookie } from 'typescript-cookie';
import Dropzone from 'react-dropzone';

const ImportExport = () => {
  const importConfig = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
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

    window.location.reload();
  };

  const exportConfig = () => {
    const file = new Blob([JSON.stringify(Config)], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'tabby-config.json');
  };

  return (
    <Flex vertical gap={10}>
      <Typography.Title level={3}>Tabby Config</Typography.Title>

      <Button icon={<UploadOutlined />} onClick={exportConfig}>
        Export Config
      </Button>

      <Dropzone
        onDrop={files => importConfig(files[0])}
        maxFiles={1}
        accept={{ 'application/json': ['.json'] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <Button block icon={<DownloadOutlined />}>
              Import Config
            </Button>
          </div>
        )}
      </Dropzone>
    </Flex>
  );
};

export default ImportExport;
