import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Sun, Gauge } from 'lucide-react';

const MarsWeather = () => {
  const weatherData = {
    sol: 3987,
    high: '-15°C',
    low: '-75°C',
    pressure: '750 Pa',
    radiation: 'High',
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/><path d="M12 12a5 5 0 1 0 5 5 5 5 0 0 0-5-5Z"/><path d="M12 12a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z"/></svg>
          <CardTitle className="font-headline">Mars Weather</CardTitle>
        </div>
        <CardDescription>Latest data from the Perseverance Rover</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl font-bold font-headline">{weatherData.high}</span>
          <span className="text-muted-foreground">Sol {weatherData.sol}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span>High: {weatherData.high}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span>Low: {weatherData.low}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span>Pressure: {weatherData.pressure}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <span>UV Index: {weatherData.radiation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarsWeather;
