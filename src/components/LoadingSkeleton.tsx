import { Card, Divider, Skeleton } from 'antd';

const LoadingSkeleton = () => {
  return (
    <Card style={{ width: '400px' }}>
      <div style={{ display: 'flex' }}>
        <Skeleton.Image active />
        <Skeleton active />
      </div>

      <Divider />

      <Skeleton active title paragraph={{ rows: 2 }} />
    </Card>
  );
};

export default LoadingSkeleton;
