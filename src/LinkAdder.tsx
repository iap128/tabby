import { FC, useState } from "react";
import { LinkInterface } from "./Config";
import { Button, Form, Image, Input, Typography } from "antd";

interface Props {
    links: LinkInterface[];
    setLinks: (links: LinkInterface[]) => void;

}

const LinkAdder: FC<Props> = ({ links, setLinks }) => {
    const [adding, setAdding] = useState(false);

    const [form] = Form.useForm();

    const addLink = (values: any) => {
        setLinks([...links, values]);
        setAdding(false);
    }

    return (
        <div>
            <Typography.Title level={3}>Quick Links</Typography.Title>

            {links.map(link => (
                <div>
                    <Image preview={false} src={link.icon} />
                    <Typography.Text>{link.name}</Typography.Text>  
                </div>
            ))}

            {adding && (
                <Form form={form} onFinish={addLink} autoComplete="off">
                    <Form.Item label='Name' name='name'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='URL' name='url'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Icon' name='icon'>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            )}
            <Button type='primary' onClick={() => setAdding(true)}>Add Link</Button>
        </div>
    )
};

export default LinkAdder;