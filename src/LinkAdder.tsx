import { useState } from "react";
import { Config, LinkInterface } from "./Config";
import { Button, Form, Image, Input, Typography } from "antd";
import { setCookie } from "typescript-cookie";


const LinkAdder= () => {
    const [links, setLinks] = useState<LinkInterface[]>(Config.links);
    const [adding, setAdding] = useState(false);

    const [linkForm] = Form.useForm();

    const addLink = (values: any) => {
        const newLink: LinkInterface = {
            name: values.name,
            url: values.url,
            icon: values.icon,
        }

        setLinks([...links, newLink]);
        setAdding(false);
        setCookie('links', JSON.stringify(links));
    }

    return (
        <div>
            <Typography.Title level={3}>Quick Links</Typography.Title>

            {links.map(link => (
                <div>
                    <Image preview={false} width={50} src={link.icon} />
                    <Typography.Text>{link.name}</Typography.Text>  
                </div>
            ))}

            {adding && (
                <Form form={linkForm} onFinish={addLink} autoComplete="off">
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
                        <Button block type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            )}
            <Button type='primary' onClick={() => setAdding(true)}>Add Link</Button>
        </div>
    )
};

export default LinkAdder;