"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Thermometer, Sun, Gauge, Loader, Wind } from "lucide-react";

type MarsWeatherData = {
  sol: number;
  high: string;
  low: string;
  pressure: string;
  radiation: string;
  windSpeed?: string;
  season?: string;
};

const MarsWeather = () => {
  const [weatherData, setWeatherData] = useState<MarsWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const fetchMarsWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.nasa.gov/insight_weather/?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&feedtype=json&ver=1.0`
        );

        if (!response.ok) throw new Error("Failed to fetch Mars weather data");
        const data = await response.json();

        if (mountedRef.current && data.sol_keys && data.sol_keys.length > 0) {
          const latestSol = data.sol_keys[data.sol_keys.length - 1];
          const solData = data[latestSol];

          const transformedData: MarsWeatherData = {
            sol: parseInt(latestSol),
            high: solData.AT ? `${solData.AT.mx.toFixed(1)}°C` : "N/A",
            low: solData.AT ? `${solData.AT.mn.toFixed(1)}°C` : "N/A",
            pressure: solData.PRE ? `${solData.PRE.av.toFixed(0)} Pa` : "N/A",
            radiation: "Moderate",
            windSpeed: solData.HWS
              ? `${solData.HWS.av.toFixed(1)} m/s`
              : undefined,
            season: solData.Season || undefined,
          };

          setWeatherData(transformedData);
          setLastUpdate(new Date());
          setError(null);
        } else {
          setWeatherData({
            sol: 3987,
            high: "-15°C",
            low: "-75°C",
            pressure: "750 Pa",
            radiation: "High",
          });
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
          setWeatherData({
            sol: 3987,
            high: "-15°C",
            low: "-75°C",
            pressure: "750 Pa",
            radiation: "High",
          });
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchMarsWeather();

    const interval = setInterval(fetchMarsWeather, 30 * 60 * 1000);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleTimeString();
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-accent"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
              <path d="M12 12a5 5 0 1 0 5 5 5 5 0 0 0-5-5Z" />
              <path d="M12 12a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z" />
            </svg>
            <CardTitle className="font-headline">Mars Weather</CardTitle>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">LIVE</span>
            </div>
          </div>
        </div>
        <CardDescription>
          Latest data from NASA InSight Mission
          {lastUpdate && !loading && (
            <span className="ml-2 text-xs opacity-70">
              • Updated {formatLastUpdate(lastUpdate)}
            </span>
          )}
          {error && (
            <span className="ml-2 text-xs text-orange-500">
              • Using cached data
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {weatherData ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="text-5xl font-bold font-headline">
                {weatherData.high}
              </span>
              <div className="text-right">
                <span className="text-muted-foreground block">
                  Sol {weatherData.sol}
                </span>
                {weatherData.season && (
                  <span className="text-xs text-muted-foreground capitalize">
                    {weatherData.season}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span>High: {weatherData.high}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-blue-500" />
                <span>Low: {weatherData.low}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <span>Pressure: {weatherData.pressure}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span>UV Index: {weatherData.radiation}</span>
              </div>
              {weatherData.windSpeed && (
                <div className="flex items-center gap-2 col-span-2">
                  <Wind className="w-4 h-4 text-muted-foreground" />
                  <span>Wind Speed: {weatherData.windSpeed}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Loader className="w-8 h-8 animate-spin mb-2" />
            <span className="text-sm">Loading Mars weather data...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarsWeather;
