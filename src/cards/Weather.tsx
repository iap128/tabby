import { Card, Typography, Image, Divider, Statistic } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Config } from '../Config';

// api reference: https://docs.google.com/document/d/1_Zte7-SdOjnzBttb1-Y9e0Wgl0_3tah9dSwXUyEA3-c/edit
// https://docs.google.com/document/d/1KGb8bTVYRsNgljnNH67AMhckY8AQT2FVwZ9urj8SWBs/edit

interface WeatherResponse {
  temperatureMax: number[];
  temperatureMin: number[];
  dayOfWeek: string[];
  narrative: string[];
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
  narrative: string;
  iconCode: number;
}

const Weather = () => {
  const { stationID, weatherZip, apiKey } = Config;
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentResponse | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherCard[]>([]);

  const getWeather = useCallback(async () => {
    const response = await fetch(
      `https://api.weather.com/v3/wx/forecast/daily/5day?postalKey=${weatherZip}:US&units=e&language=en-US&format=json&apiKey=${apiKey}`,
    ).then(res => res.json());
    setWeather(response);
  }, [apiKey, weatherZip]);

  const getCurrentConditions = useCallback(async () => {
    const response = await fetch(
      `https://api.weather.com/v2/pws/observations/current?stationId=${stationID}&format=json&units=e&apiKey=${apiKey}`,
    ).then(res => res.json());
    setCurrentWeather(response.observations[0]);
  }, [apiKey, stationID]);

  const getWeatherIcon = useCallback(
    (index: number): number => {
      let icon = weather?.daypart[0].iconCode[index];
      if (icon === null) {
        icon = weather?.daypart[0].iconCode[index + 1];
      }

      return icon ?? 0;
    },
    [weather?.daypart],
  );

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
          narrative: weather.narrative[i],
          iconCode: getWeatherIcon(iconIndex),
        };

        setDailyWeather(prev => [...prev, dayToAdd]);

        iconIndex += 2;
      }
    }
  }, [getWeatherIcon, weather]);

  useEffect(() => {
    getWeather();
    getCurrentConditions();
  }, [getCurrentConditions, getWeather]);

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Card>
            <Statistic title='Wind Speed' value={currentWeather?.imperial.windSpeed} suffix='mph' />
          </Card>
          <Card>
            <Statistic
              title='Precipitation Quantity'
              value={currentWeather?.imperial.precipTotal}
              suffix='in'
            />
          </Card>
        </div>

        <Divider />

        <Typography.Paragraph style={{ maxWidth: '400px' }} type='secondary'>
          {dailyWeather[0]?.narrative}
        </Typography.Paragraph>
      </div>
    );
  };

  return (
    <Card title='Weather' extra={<a href={`https://www.google.com/search?q=weather%20${weatherZip}`}>View More</a>}>
      <CurrentConditions />

      <Divider />

      <div style={{ display: 'flex', gap: '15px' }}>
        {dailyWeather.map(day => (
          <div
            key={day.dayName}
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
