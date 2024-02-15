import { Card, Typography, Image, Divider, Statistic } from 'antd';
import { useCallback, useEffect, useState } from 'react';

// api reference: https://docs.google.com/document/d/1_Zte7-SdOjnzBttb1-Y9e0Wgl0_3tah9dSwXUyEA3-c/edit
// https://docs.google.com/document/d/1KGb8bTVYRsNgljnNH67AMhckY8AQT2FVwZ9urj8SWBs/edit

interface WeatherResponse {
  temperatureMax: number[];
  temperatureMin: number[];
  dayOfWeek: string[];
  daypart: DayPart[];
}

interface DayPart {
  iconCode: number[];
  windSpeed: number[];
  windDirectionCardinal: string[];
  precipChance: number[];
  temperature: number[];
}

interface CurrentResponse {
  imperial: {
    precipTotal: number;
    temp: number;
    windChill: number;
    windGust: number;
    windSpeed: number;
  };
  winddir: number;
}

interface DailyWeatherCard {
  dayName: string;
  tempMax: number;
  tempMin: number;
  iconCode: number;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentResponse | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherCard[]>([]);

  const getWeather = async () => {
    const response = await fetch(
      'https://api.weather.com/v3/wx/forecast/daily/5day?postalKey=97008:US&units=e&language=en-US&format=json&apiKey=7c8632e7f0c34cfa8632e7f0c36cfa4a',
    ).then(res => res.json());
    setWeather(response);
  };

  const getCurrentConditions = async () => {
    const response = await fetch(
      'https://api.weather.com/v2/pws/observations/current?stationId=KORBEAVE588&format=json&units=e&apiKey=7c8632e7f0c34cfa8632e7f0c36cfa4a',
    ).then(res => res.json());
    setCurrentWeather(response.observations[0]);
  };

  const getWeatherIcon = (index: number): number => {
    let icon = weather?.daypart[0].iconCode[index];
    if (icon === null) {
      icon = weather?.daypart[0].iconCode[index + 1];
    }

    return icon ?? 0;
  };

  const buildDailyCard = useCallback(() => {
    if (weather) {
      // the icon code is given as day and night. Day indices are positive
      // and night indices are negative. We are only interested in the day icons
      let iconIndex = 0;

      for (let i = 0; i < weather.dayOfWeek.length; i++) {
        const dayToAdd: DailyWeatherCard = {
          dayName: weather.dayOfWeek[i],
          tempMax: weather?.temperatureMax[i],
          tempMin: weather?.temperatureMin[i],
          iconCode: getWeatherIcon(i),
        };

        setDailyWeather(prev => [...prev, dayToAdd]);

        iconIndex += 2;
      }
    }
  }, [weather]);

  useEffect(() => {
    getWeather();
    getCurrentConditions();
  }, []);

  useEffect(() => {
    buildDailyCard();
  }, [buildDailyCard]);

  const CurrentConditions = () => {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Image
            preview={false}
            src={`./weathericons/icon${dailyWeather[0]?.iconCode}.png`}
            width={64}
            height={64}
          />
          <Typography.Title>{currentWeather?.imperial.temp}</Typography.Title>
          <Typography.Text type='secondary'>
            Feels Like {currentWeather?.imperial.windChill}
          </Typography.Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Statistic title='Wind Speed' value={currentWeather?.imperial.windSpeed} suffix='mph' />
          <Statistic
            title='Precipitation Quantity'
            value={currentWeather?.imperial.precipTotal}
            suffix='in'
          />
        </div>
      </div>
    );
  };

  return (
    <Card title='Weather'>
      <CurrentConditions />

      <Divider />

      <div style={{ display: 'flex', gap: '15px' }}>
        {dailyWeather.map(day => (
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
          >
            <Typography.Text strong>{day.dayName}</Typography.Text>
            <Image
              preview={false}
              src={`./weathericons/icon${day.iconCode}.png`}
              width={32}
              height={32}
            />
            <div>
              <Typography.Text>{day.tempMax}</Typography.Text>
              <Typography.Text type='secondary'> / </Typography.Text>
              <Typography.Text type='secondary'>{day.tempMin}</Typography.Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Weather;
