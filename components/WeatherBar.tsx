"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const WeatherBar = () => {
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    icon: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Tampa, FL coordinates
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=27.9506&longitude=-82.4572&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York'
        );
        const data = await response.json();
        
        const weatherCode = data.current.weather_code;
        const temp = Math.round(data.current.temperature_2m);
        
        // Map weather codes to conditions
        let condition = "Clear";
        let icon = "sun";
        
        if (weatherCode === 0) {
          condition = "Clear";
          icon = "sun";
        } else if (weatherCode <= 3) {
          condition = "Partly Cloudy";
          icon = "cloud";
        } else if (weatherCode <= 67) {
          condition = "Rainy";
          icon = "rain";
        } else if (weatherCode <= 77) {
          condition = "Snow";
          icon = "snow";
        } else if (weatherCode <= 82) {
          condition = "Showers";
          icon = "drizzle";
        } else {
          condition = "Cloudy";
          icon = "cloud";
        }

        setWeather({ temp, condition, icon });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
  }, []);

  if (!isVisible) return null;

  const WeatherIcon = () => {
    switch (weather?.icon) {
      case "sun":
        return <Sun className="h-4 w-4" />;
      case "rain":
        return <CloudRain className="h-4 w-4" />;
      case "snow":
        return <CloudSnow className="h-4 w-4" />;
      case "drizzle":
        return <CloudDrizzle className="h-4 w-4" />;
      default:
        return <Cloud className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3">
        {weather ? (
          <>
            <WeatherIcon />
            <p className="text-sm font-medium">
              Tampa Weather: {weather.temp}°F, {weather.condition}
            </p>
            <span className="text-xs opacity-80 hidden sm:inline">
              • Perfect day for a car wash! 🚗✨
            </span>
          </>
        ) : (
          <>
            <Cloud className="h-4 w-4 animate-pulse" />
            <p className="text-sm font-medium">Loading Tampa weather...</p>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeatherBar;
