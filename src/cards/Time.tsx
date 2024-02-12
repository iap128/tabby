import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Statistic } from "antd";

const Time = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return (
        <Card>
            <Statistic title='Clock'  value={hours + ':' + minutes} prefix={<FontAwesomeIcon icon={faClock}/>} />
        </Card>
    );
};

export default Time;