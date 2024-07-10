import { Button, Drawer, Form, Input, Typography } from "antd";
import { Config, LinkInterface } from "../Config";
import { FC, useState } from "react";
import { setCookie } from "typescript-cookie";
import LinkAdder from "../LinkAdder";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Settings: FC<Props> = ({ open, setOpen }) => {
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [form] = Form.useForm();

    const closeFunction = (values: any) => {
        setCookie('key', values.key);
        setCookie('id', values.station);
        setCookie('zip', values.zip);
        setCookie('links', JSON.stringify(links));

        setOpen(false);
        window.location.reload();
    };

    return (
        <Drawer title='Settings' open={open} onClose={() => setOpen(false)}>
            <Form form={form} onFinish={closeFunction} autoComplete="off">
                <Typography.Title level={3}>Weather</Typography.Title>
                <Form.Item label='API Key' name='key' initialValue={Config.apiKey}>
                    <Input />
                </Form.Item>
                <Form.Item label='Station ID' name='station' initialValue={Config.stationID}>
                    <Input />
                </Form.Item>
                <Form.Item label='Zip Code' name='zip' initialValue={Config.weatherZip}>
                    <Input />
                </Form.Item>

                <LinkAdder links={links} setLinks={setLinks}/>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
};

export default Settings;