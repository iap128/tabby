import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Statistic } from "antd";
import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";

const Time = () => {
    const [time, setTime] = useState('');

    const timeString = () => {
        let returnString = '';

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        if (hours > 12) {
            returnString += ((hours - 12).toString());
        }
        else {
            returnString += (hours.toString());
        }

        returnString +=(':');
        returnString += (minutes.toString());
        if (hours > 11) {
            returnString += (' PM');
        }
        else {
            returnString += (' AM');
        }

        setTime(returnString);
    };

    useEffect(() => {
        const interval = setInterval(() => timeString(), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            {time === '' ? <ClockLoader /> : <Statistic title='Clock' value={time} prefix={<FontAwesomeIcon icon={faClock}/>} />}
        </Card>
    );
};

export default Time;