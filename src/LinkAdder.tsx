import { useState } from "react";
import { Config, LinkInterface } from "./Config";
import { Button, Form, Image, Input, Typography } from "antd";
import { setCookie } from "typescript-cookie";
import { DeleteOutlined } from "@ant-design/icons";


const LinkAdder= () => {
    const [links, setLinks] = useState<LinkInterface[]>(Config.links);
    const [adding, setAdding] = useState(false);

    const [linkForm] = Form.useForm();

    const addLink = (values: any) => {
        const newLink: LinkInterface = {
            name: values.name,
            url: values.url,
            icon: values.icon,
        };

        setAdding(false);
        setCookie('links', JSON.stringify([...links, newLink]), { expires: 365 });
        setLinks([...links, newLink]);
    };

    const deleteLink = (link: LinkInterface) => {
        const updatedLinks = links.filter(l => l !== link);
        setCookie('links', JSON.stringify(updatedLinks), { expires: 365 });
        setLinks(updatedLinks);
    }

    return (
        <div>
            <Typography.Title level={3}>Quick Links</Typography.Title>

            {links.map(link => (
                <div key={link.name}>
                    <Image preview={false} width={50} src={link.icon} />
                    <Typography.Text>{link.name}</Typography.Text>
                    <Button icon={<DeleteOutlined />} onClick={() => deleteLink(link)} />
                </div>
            ))}

            {adding && (
                <Form form={linkForm} onFinish={addLink} autoComplete="off">
                    <Form.Item label='Link Name' name='name'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Link URL' name='url'>
                        <Input type='url' />
                    </Form.Item>
                    <Form.Item label='Icon URL' name='icon'>
                        <Input type="url" />
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