import { Button, Drawer, Form, Input } from "antd";
import { Config } from "../Config";
import { FC } from "react";
import { setCookie } from "typescript-cookie";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Settings: FC<Props> = ({ open, setOpen }) => {
    const [form] = Form.useForm();

    const closeFunction = (values: any) => {
        setCookie('key', values.key);
        setCookie('id', values.station);
        setCookie('zip', values.zip);

        setOpen(false);
        window.location.reload();
    };

    return (
        <Drawer title='Settings' open={open} onClose={() => setOpen(false)}>
            <Form form={form} onFinish={closeFunction} autoComplete="off">
                <Form.Item label='API Key' name='key' initialValue={Config.apiKey}>
                    <Input />
                </Form.Item>
                <Form.Item label='Station ID' name='station' initialValue={Config.stationID}>
                    <Input />
                </Form.Item>
                <Form.Item label='Zip Code' name='zip' initialValue={Config.weatherZip}>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
};

export default Settings;