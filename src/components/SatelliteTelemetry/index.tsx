"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Radio, Gauge, Thermometer, Battery, Signal, Loader } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type SatelliteTelemetry = {
    id: string;
    name: string;
    temperature: number;
    batteryLevel: number;
    signalStrength: number;
    powerConsumption: number;
    solarPanelVoltage: number;
    status: 'operational' | 'degraded' | 'offline';
    lastContact: string;
    orbitNumber: number;
    dataRate: number;
};

const SatelliteTelemetry = () => {
    const [telemetryData, setTelemetryData] = useState<SatelliteTelemetry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSat, setSelectedSat] = useState<number>(0);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const fetchTelemetryData = async () => {
            try {
                setLoading(true);

                // Fake data that needed to be taken from actual api
                const mockData: SatelliteTelemetry[] = [
                    {
                        id: '25544',
                        name: 'ISS (ZARYA)',
                        temperature: Math.random() * 30 - 10,
                        batteryLevel: 85 + Math.random() * 10,
                        signalStrength: 75 + Math.random() * 20,
                        powerConsumption: 15 + Math.random() * 5,
                        solarPanelVoltage: 160 + Math.random() * 20,
                        status: 'operational',
                        lastContact: new Date().toISOString(),
                        orbitNumber: 15847 + Math.floor(Math.random() * 10),
                        dataRate: 2.4 + Math.random() * 0.5
                    },
                    {
                        id: '43013',
                        name: 'NOAA-20',
                        temperature: Math.random() * 40 - 20,
                        batteryLevel: 78 + Math.random() * 15,
                        signalStrength: 82 + Math.random() * 15,
                        powerConsumption: 8 + Math.random() * 3,
                        solarPanelVoltage: 28 + Math.random() * 4,
                        status: 'operational',
                        lastContact: new Date(Date.now() - Math.random() * 300000).toISOString(),
                        orbitNumber: 21034 + Math.floor(Math.random() * 5),
                        dataRate: 1.8 + Math.random() * 0.3
                    },
                    {
                        id: '48274',
                        name: 'Starlink-1007',
                        temperature: Math.random() * 50 - 25,
                        batteryLevel: 65 + Math.random() * 25,
                        signalStrength: 88 + Math.random() * 10,
                        powerConsumption: 5 + Math.random() * 2,
                        solarPanelVoltage: 48 + Math.random() * 8,
                        status: Math.random() > 0.9 ? 'degraded' : 'operational',
                        lastContact: new Date(Date.now() - Math.random() * 180000).toISOString(),
                        orbitNumber: 8234 + Math.floor(Math.random() * 8),
                        dataRate: 0.9 + Math.random() * 0.2
                    }
                ];

                if (mountedRef.current) {
                    setTelemetryData(mockData);
                    setError(null);
                }
            } catch (err) {
                if (mountedRef.current) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                }
            } finally {
                if (mountedRef.current) {
                    setLoading(false);
                }
            }
        };

        fetchTelemetryData();
        const interval = setInterval(fetchTelemetryData, 5000);

        return () => {
            mountedRef.current = false;
            clearInterval(interval);
        };
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational': return 'default';
            case 'degraded': return 'secondary';
            case 'offline': return 'destructive';
            default: return 'secondary';
        }
    };

    const formatLastContact = (isoString: string) => {
        const diff = Date.now() - new Date(isoString).getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        if (minutes > 0) return `${minutes}m ${seconds}s ago`;
        return `${seconds}s ago`;
    };

    const currentSat = telemetryData[selectedSat];

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Radio className="w-6 h-6 text-accent" />
                    <CardTitle className="font-headline">Satellite Telemetry</CardTitle>
                    {loading && <Loader className="w-4 h-4 animate-spin text-muted-foreground" />}
                </div>
                <CardDescription>Real-time spacecraft health monitoring</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                        <Loader className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-sm">Receiving telemetry data...</span>
                    </div>
                ) : error ? (
                    <div className="text-destructive p-4 text-center text-sm">
                        {error}
                    </div>
                ) : currentSat ? (
                    <>
                        {/* Satellite Selector */}
                        <div className="flex gap-2 flex-wrap">
                            {telemetryData.map((sat, index) => (
                                <button
                                    key={sat.id}
                                    onClick={() => setSelectedSat(index)}
                                    className={`px-3 py-1 rounded-md text-xs transition-colors ${selectedSat === index
                                            ? 'bg-accent text-accent-foreground'
                                            : 'bg-muted hover:bg-muted/80'
                                        }`}
                                >
                                    {sat.name}
                                </button>
                            ))}
                        </div>

                        {/* Satellite Status */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Satellite className="w-5 h-5" />
                                <div>
                                    <h3 className="font-semibold text-sm">{currentSat.name}</h3>
                                    <p className="text-xs text-muted-foreground">ID: {currentSat.id}</p>
                                </div>
                            </div>
                            <Badge variant={getStatusColor(currentSat.status)}>
                                {currentSat.status.toUpperCase()}
                            </Badge>
                        </div>

                        {/* Telemetry Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Battery className="w-4 h-4 text-green-500" />
                                        <span className="text-xs">Battery</span>
                                    </div>
                                    <span className="font-medium">{currentSat.batteryLevel.toFixed(1)}%</span>
                                </div>
                                <Progress value={currentSat.batteryLevel} className="w-full h-2" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Signal className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs">Signal</span>
                                    </div>
                                    <span className="font-medium">{currentSat.signalStrength.toFixed(1)}%</span>
                                </div>
                                <Progress value={currentSat.signalStrength} className="w-full h-2" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                    <Thermometer className="w-4 h-4 text-red-500" />
                                    <span className="text-xs">Temperature</span>
                                </div>
                                <span className="font-medium">{currentSat.temperature.toFixed(1)}°C</span>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                    <Gauge className="w-4 h-4 text-yellow-500" />
                                    <span className="text-xs">Power</span>
                                </div>
                                <span className="font-medium">{currentSat.powerConsumption.toFixed(1)} kW</span>
                            </div>
                        </div>

                        {/* Additional Metrics */}
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t pt-4">
                            <div>
                                <span className="block">Solar Panel Voltage</span>
                                <span className="font-medium text-foreground">{currentSat.solarPanelVoltage.toFixed(1)} V</span>
                            </div>
                            <div>
                                <span className="block">Data Rate</span>
                                <span className="font-medium text-foreground">{currentSat.dataRate.toFixed(1)} Mbps</span>
                            </div>
                            <div>
                                <span className="block">Orbit Number</span>
                                <span className="font-medium text-foreground">#{currentSat.orbitNumber}</span>
                            </div>
                            <div>
                                <span className="block">Last Contact</span>
                                <span className="font-medium text-foreground">{formatLastContact(currentSat.lastContact)}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-muted-foreground p-4 text-center text-sm">
                        No telemetry data available.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SatelliteTelemetry;
