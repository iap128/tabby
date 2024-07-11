import { Button, Divider, Drawer, Form, Input, Typography } from "antd";
import { Config } from "../Config";
import { FC } from "react";
import { setCookie } from "typescript-cookie";
import LinkAdder from "../LinkAdder";
import { QuestionOutlined } from "@ant-design/icons";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Settings: FC<Props> = ({ open, setOpen }) => {
    const [form] = Form.useForm();

    const closeFunction = (values: any) => {
        if (values.key) {
            setCookie('key', values.key);
        }
        if (values.station) {
            setCookie('id', values.station);
        }
        if (values.zip) {
            setCookie('zip', values.zip);
        }

        setOpen(false);
        window.location.reload();
    };

    return (
        <Drawer title='Settings' open={open} onClose={() => window.location.reload()}>
            <Form form={form} onFinish={closeFunction} autoComplete="off">
                <Typography.Title level={3}>Weather</Typography.Title>
                
                <Form.Item label='API Key' name='key' initialValue={Config.apiKey}>
                    <Input />
                </Form.Item>
                <Button size="small" icon={<QuestionOutlined />} onClick={() => window.open('https://openthings.freshdesk.com/support/solutions/articles/5000017485-getting-a-weather-underground-wu-api-key')} />
                
                <Form.Item label='Station ID' name='station' initialValue={Config.stationID}>
                    <Input />
                </Form.Item>
                <Button size="small" icon={<QuestionOutlined />} onClick={() => window.open('https://www.wunderground.com/pws/overview')} />
                
                <Form.Item label='Zip Code' name='zip' initialValue={Config.weatherZip}>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">Save</Button>
                </Form.Item>

                <Divider />
            </Form>

            <LinkAdder />
        </Drawer>
    )
};

export default Settings;