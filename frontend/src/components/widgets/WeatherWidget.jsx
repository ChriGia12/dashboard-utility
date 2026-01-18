import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, MapPin } from 'lucide-react';

// API gratuita OpenWeatherMap - Ottieni la tua chiave su https://openweathermap.org/api
// ISTRUZIONI: Sostituisci 'TUA_API_KEY_QUI' con la tua chiave gratuita
const WEATHER_API_KEY = 'TUA_API_KEY_QUI';
const CITY = 'Milano';

export const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temp: 22,
    condition: 'Soleggiato',
    humidity: 65,
    wind: 12,
    location: 'Milano, Italia',
    isReal: false
  });
  const [loading, setLoading] = useState(false);

  // Funzione per ottenere meteo reale
  const fetchRealWeather = async () => {
    if (WEATHER_API_KEY === 'TUA_API_KEY_QUI') {
      // Usa dati simulati se non c'è API key
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric&lang=it`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed * 3.6), // m/s to km/h
          location: `${data.name}, Italia`,
          isReal: true
        });
      }
    } catch (error) {
      console.log('Meteo non disponibile, uso dati simulati');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealWeather();
    // Aggiorna ogni 30 minuti
    const interval = setInterval(fetchRealWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Simula variazioni se usa dati mock
  useEffect(() => {
    if (!weather.isReal) {
      const interval = setInterval(() => {
        setWeather(prev => ({
          ...prev,
          temp: Math.floor(Math.random() * 10) + 18,
          humidity: Math.floor(Math.random() * 30) + 50
        }));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [weather.isReal]);

  const getWeatherIcon = () => {
    const condition = weather.condition.toLowerCase();
    if (condition.includes('sole') || condition.includes('sereno') || condition.includes('clear')) {
      return <Sun className="h-12 w-12 text-warning" />;
    } else if (condition.includes('nuvo') || condition.includes('coperto') || condition.includes('cloud')) {
      return <Cloud className="h-12 w-12 text-muted-foreground" />;
    } else if (condition.includes('pioggia') || condition.includes('rain')) {
      return <CloudRain className="h-12 w-12 text-primary" />;
    }
    return <Sun className="h-12 w-12 text-warning" />;
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          {getWeatherIcon()}
          <span className="widget-title">Meteo</span>
          {!weather.isReal && (
            <span className="text-xs text-muted-foreground">(simulato)</span>
          )}
        </div>
      </div>
      <div className="flex-1 p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">Caricamento...</div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-5xl font-bold text-foreground">{weather.temp}°C</div>
                <div className="text-lg text-muted-foreground mt-2 capitalize">{weather.condition}</div>
              </div>
              {getWeatherIcon()}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Località
                </span>
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
            {!weather.isReal && (
              <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded">
                <strong>💡 Per meteo reale:</strong><br/>
                1. Registrati su <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-primary underline">OpenWeatherMap</a><br/>
                2. Ottieni la tua API key gratuita<br/>
                3. Sostituisci 'TUA_API_KEY_QUI' nel file WeatherWidget.jsx<br/>
                4. Riavvia l'app
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};