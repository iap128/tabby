import { Card, Image, Typography } from "antd";

interface LinkInterface {
    name: string;
    url: string;
    icon: string;
};

const Links: LinkInterface[] = [
    {
        name: 'Chrome Web Store',
        url: 'https://chromewebstore.google.com',
        icon: './webstore.png'
    }
];

const QuickLinks = () => {
    return (
        <Card title='Shortcuts'>
            {Links.map(link =>
                 <a href={link.url} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Image preview={false} src={link.icon} width={32} height={32} />
                    <Typography.Text>{link.name}</Typography.Text>
                </a>
            )}
        </Card>
    );
};

export default QuickLinks;