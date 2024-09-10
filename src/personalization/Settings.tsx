import { Button, Divider, Drawer, Flex, Form, Input, Typography } from 'antd';
import { Config } from '../Config';
import { FC, useState } from 'react';
import LinkAdder from '../LinkAdder';
import { QuestionOutlined } from '@ant-design/icons';
import ImportExport from './ImportExport';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Settings: FC<Props> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [changedLink, setChangedLink] = useState(false);

  const closeFunction = (values: any) => {
    if (values.key) {
      window.localStorage.setItem('key', values.key);
    }
    if (values.station) {
      window.localStorage.setItem('id', values.station);
    }
    if (values.zip) {
      window.localStorage.setItem('zip', values.zip);
    }

    setOpen(false);
    window.location.reload();
  };

  return (
    <Drawer
      title='Settings'
      open={open}
      onClose={() => {
        if (changedLink) {
          window.location.reload();
        } else {
          setOpen(false);
        }
      }}
    >
      <Form form={form} onFinish={closeFunction} autoComplete='off'>
        <Typography.Title level={3}>Weather</Typography.Title>

        <Flex>
          <Form.Item label='Station ID' name='station' initialValue={Config.stationID}>
            <Input />
          </Form.Item>
          <Button
            size='small'
            icon={<QuestionOutlined />}
            onClick={() => window.open('https://www.wunderground.com/pws/overview')}
          />
        </Flex>

        <Form.Item label='Zip Code' name='zip' initialValue={Config.weatherZip}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button block type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>

        <Divider />
      </Form>

      <LinkAdder setLinkChanged={setChangedLink} />

      <Divider />

      <ImportExport />
    </Drawer>
  );
};

export default Settings;
