import { Card, Skeleton } from "antd";

const LoadingSkeleton = () => {
    return (
        <Card style={{ width: '400px', height: '400px'}}>
            <Skeleton active />
        </Card>
    )
};

export default LoadingSkeleton;