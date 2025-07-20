"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Satellite, Clock, Sun, Moon, Activity, MapPin, Thermometer, Wind, Eye, Loader, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ISSData = {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
};

type EarthquakeData = {
  magnitude: number;
  location: string;
  time: string;
  depth: number;
};

type SolarData = {
  uvIndex: number;
  solarActivity: string;
  magneticField: string;
};

const EarthImage = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [earthquakes, setEarthquakes] = useState<EarthquakeData[]>([]);
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [lastISSUpdate, setLastISSUpdate] = useState<Date | null>(null);
  const [earthStats, setEarthStats] = useState({
    dayLength: "24h 0m 0s",
    season: "Summer (Northern)",
    sunDistance: "152.1M km",
    moonPhase: "Waxing Crescent",
    population: "8.1B",
    co2Level: "421.5 ppm"
  });

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleString("en-US", {
          dateStyle: window.innerWidth < 640 ? "medium" : "long",
          timeStyle: "short",
        })
      );

      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
      
      let season = "Spring (Northern)";
      if (dayOfYear >= 80 && dayOfYear < 172) season = "Spring (Northern)";
      else if (dayOfYear >= 172 && dayOfYear < 266) season = "Summer (Northern)";
      else if (dayOfYear >= 266 && dayOfYear < 356) season = "Autumn (Northern)";
      else season = "Winter (Northern)";

      const earthSunDistance = 149.6 + (3.4 * Math.cos((dayOfYear * 2 * Math.PI) / 365.25));
      
      setEarthStats((prev) => ({
        ...prev,
        season,
        sunDistance: `${earthSunDistance.toFixed(1)}M km`,
      }));
    };

    const fetchISSData = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        if (!response.ok) throw new Error('Failed to fetch ISS data');
        const data: ISSData = await response.json();
        
        if (mountedRef.current) {
          setIssData(data);
          setLastISSUpdate(new Date());
        }
      } catch (err) {
        console.error('Failed to fetch ISS data:', err);
      }
    };

    const fetchEarthquakeData = async () => {
      try {
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson');
        if (response.ok) {
          const data = await response.json();
          const earthquakeList: EarthquakeData[] = data.features.slice(0, 3).map((quake: any) => ({
            magnitude: quake.properties.mag,
            location: quake.properties.place,
            time: new Date(quake.properties.time).toLocaleTimeString(),
            depth: quake.geometry.coordinates[2]
          }));
          if (mountedRef.current) setEarthquakes(earthquakeList);
        }
      } catch (err) {
        console.error('Failed to fetch earthquake data:', err);
      }
    };

    const fetchSolarActivity = async () => {
      try {
        const response = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');
        if (response.ok) {
          const data = await response.json();
          const latestKIndex = data[data.length - 1];
          const kValue = parseFloat(latestKIndex[1]) || 2;
          
          let activity = "Low";
          let magneticField = "Stable";
          
          if (kValue >= 5) {
            activity = "High";
            magneticField = "Active";
          } else if (kValue >= 3) {
            activity = "Moderate";
            magneticField = "Unsettled";
          }

          if (mountedRef.current) {
            setSolarData({
              uvIndex: Math.round(3 + (kValue / 9) * 8),
              solarActivity: activity,
              magneticField: magneticField
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch solar data:', err);
        if (mountedRef.current) {
          setSolarData({
            uvIndex: 5,
            solarActivity: "Moderate",
            magneticField: "Stable"
          });
        }
      }
    };

    updateDateTime();
    fetchISSData();
    fetchEarthquakeData();
    fetchSolarActivity();
    setLoading(false);

    const dateInterval = setInterval(updateDateTime, 1000);
    const issInterval = setInterval(fetchISSData, 3000);
    const dataInterval = setInterval(() => {
      fetchEarthquakeData();
      fetchSolarActivity();
    }, 60000);

    return () => {
      mountedRef.current = false;
      clearInterval(dateInterval);
      clearInterval(issInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 7) return "bg-red-500/80";
    if (magnitude >= 5.5) return "bg-orange-500/80";
    if (magnitude >= 4) return "bg-yellow-500/80";
    return "bg-green-500/80";
  };

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2 pb-2 sm:pb-6">
        <div className="flex items-center gap-1 sm:gap-2">
          <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
          <CardTitle className="font-headline text-sm sm:text-base md:text-lg">Live Earth Monitor</CardTitle>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Badge variant="outline" className="text-xs px-1 py-0.5 sm:px-2 sm:py-1">
            <Activity className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            LIVE
          </Badge>
          {loading && <Loader className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent className="flex-grow relative rounded-md overflow-hidden p-0">
        <iframe
          src="https://solarsystem.nasa.gov/gltf_embed/2393/"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px]"
          title="NASA 3D Earth Globe"
        />

        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 space-y-1 max-w-[180px] sm:max-w-xs">
          <div className="bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2 backdrop-blur-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{currentDate}</span>
          </div>
          <div className="bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-xs flex items-center gap-1 sm:gap-2 backdrop-blur-sm">
            <Sun className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{earthStats.season}</span>
          </div>
          {issData && (
            <div className="bg-blue-600/90 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-xs flex items-center gap-1 sm:gap-2 backdrop-blur-sm">
              <Satellite className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <div className="min-w-0">
                <div className="truncate">ISS: {issData.latitude.toFixed(1)}°, {issData.longitude.toFixed(1)}°</div>
                <div className="text-xs opacity-75 truncate">Alt: {issData.altitude.toFixed(0)} km • {issData.velocity.toFixed(0)} km/h</div>
              </div>
            </div>
          )}
          {lastISSUpdate && (
            <div className="bg-green-600/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm hidden sm:block">
              ISS Updated: {formatLastUpdate(lastISSUpdate)}
            </div>
          )}
        </div>

        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 space-y-1 max-w-[100px] sm:max-w-none">
          <div className="bg-blue-500/80 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs backdrop-blur-sm">
            <span className="hidden sm:inline">Sun: </span>{earthStats.sunDistance}
          </div>
          <div className="bg-purple-500/80 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs backdrop-blur-sm flex items-center gap-1">
            <Moon className="w-2 h-2 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">{earthStats.moonPhase}</span>
          </div>
          {solarData && (
            <div className="bg-orange-500/80 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs backdrop-blur-sm">
              UV: {solarData.uvIndex}/11
            </div>
          )}
          <div className="bg-green-500/80 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs backdrop-blur-sm">
            <span className="hidden sm:inline">Pop: </span>{earthStats.population}
          </div>
        </div>

        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 space-y-1 max-w-[120px] sm:max-w-xs">
          {solarData && (
            <div className="bg-yellow-500/80 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs backdrop-blur-sm">
              <span className="hidden sm:inline">Solar: </span>{solarData.solarActivity}
            </div>
          )}
          <div className="bg-red-500/80 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs backdrop-blur-sm">
            CO₂: {earthStats.co2Level}
          </div>
          {issData && (
            <div className="bg-cyan-600/80 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs backdrop-blur-sm">
              <span className="hidden sm:inline">ISS: </span>{issData.visibility}
            </div>
          )}
        </div>

        {earthquakes.length > 0 && (
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 space-y-1 max-w-[180px] sm:max-w-xs">
            <div className="bg-black/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                <span className="font-semibold text-xs">Earthquakes</span>
              </div>
              {earthquakes.slice(0, window.innerWidth < 640 ? 1 : 2).map((quake, index) => (
                <div key={index} className="text-xs mb-1">
                  <div className={`inline-block px-1 rounded text-white text-xs mr-1 ${getMagnitudeColor(quake.magnitude)}`}>
                    M{quake.magnitude.toFixed(1)}
                  </div>
                  <div className="text-xs truncate">{quake.location.split(',')[0]}</div>
                  <div className="text-xs opacity-70 hidden sm:block">{quake.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EarthImage;
