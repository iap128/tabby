import { Card, Typography, Image } from "antd";
import { useCallback, useEffect, useState } from "react";

//api reference :https://docs.google.com/document/d/1_Zte7-SdOjnzBttb1-Y9e0Wgl0_3tah9dSwXUyEA3-c/edit

interface WeatherResponse {
    temperatureMax: number[];
    temperatureMin: number[];
    dayOfWeek: string[];
    daypart: DayPart[];
}

interface DayPart {
    iconCode: number[];
    windSpeed: number[];
}

interface DailyWeatherCard {
    dayName: string;
    tempMax: number;
    tempMin: number;
    iconCode: number;
}

const Weather = () => {
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [dailyWeather, setDailyWeather] = useState<DailyWeatherCard[]>([]);
    
    const getWeather = async () => {
        const response  = await fetch('https://api.weather.com/v3/wx/forecast/daily/5day?postalKey=97008:US&units=e&language=en-US&format=json&apiKey=7c8632e7f0c34cfa8632e7f0c36cfa4a').then(res => res.json());
        setWeather(response);
    };

    const buildDailyCard = useCallback(() => {
        if (weather) {
            
            //the icon code is given as day and night. Day indices are positive
            //and night indices are negative. We are only interested in the day icons
            const icons = weather?.daypart.map(day => day.iconCode).flat();
            
            for (let i = 0; i < weather.dayOfWeek.length; i++) {
                const dayToAdd: DailyWeatherCard = {
                    dayName: weather.dayOfWeek[i],
                    tempMax: weather?.temperatureMax[i],
                    tempMin: weather?.temperatureMin[i],
                    iconCode: weather?.daypart[0].iconCode[0]
                }
    
                setDailyWeather(prev => [...prev, dayToAdd]);
            }
        }

    }, [weather]);

    useEffect(() => {
        getWeather();
    }, []);

    useEffect(() => {
        buildDailyCard();
    }, [buildDailyCard]);

    return (
        <Card title='Weather'>
            <div style={{ display: 'flex', gap: '15px' }}>
                {dailyWeather.map(day => 
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <Typography.Text strong>{day.dayName}</Typography.Text>
                        <Image preview={false} src={`./weathericons/icon${day.iconCode}.png`} width={32} height={32} />
                        <div>
                            <Typography.Text>{day.tempMax}</Typography.Text>
                            <Typography.Text type="secondary"> / </Typography.Text>
                            <Typography.Text type="secondary">{day.tempMin}</Typography.Text>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
};

export default Weather;