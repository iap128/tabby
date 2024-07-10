import { Card, Image, Typography } from 'antd';
import { Config } from '../Config';

const QuickLinks = () => {
  const { links } = Config;

  return (
    <Card title='Shortcuts'>
      {links.map(link => (
        <a key={link.name} href={link.url} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Image preview={false} src={link.icon} width={32} height={32} />
          <Typography.Text>{link.name}</Typography.Text>
        </a>
      ))}
    </Card>
  );
};

export default QuickLinks;
