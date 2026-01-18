import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';
import { useState, useEffect } from 'react';

export const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temp: 22,
    condition: 'Soleggiato',
    humidity: 65,
    wind: 12,
    location: 'Milano, Italia'
  });

  // Simula aggiornamenti meteo
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temp: Math.floor(Math.random() * 10) + 18,
        humidity: Math.floor(Math.random() * 30) + 50
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Soleggiato':
        return <Sun className="h-12 w-12 text-warning" />;
      case 'Nuvoloso':
        return <Cloud className="h-12 w-12 text-muted-foreground" />;
      case 'Piovoso':
        return <CloudRain className="h-12 w-12 text-primary" />;
      default:
        return <Sun className="h-12 w-12 text-warning" />;
    }
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          {getWeatherIcon()}
          <span className="widget-title">Meteo</span>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-5xl font-bold text-foreground">{weather.temp}°C</div>
            <div className="text-lg text-muted-foreground mt-2">{weather.condition}</div>
          </div>
          {getWeatherIcon()}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Località</span>
            <span className="font-medium text-foreground">{weather.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Umidità</span>
            <span className="font-medium text-foreground">{weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Wind className="h-4 w-4" />
              Vento
            </span>
            <span className="font-medium text-foreground">{weather.wind} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};