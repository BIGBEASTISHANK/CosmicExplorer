"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Satellite, Loader, Orbit, ChevronsUp, Eye, Rocket } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type ISSData = {
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    visibility: string;
};

const crew = [
    { name: 'Oleg Kononenko', role: 'Commander, Expedition 71', avatar: 'OK' },
    { name: 'Nikolai Chub', role: 'Flight Engineer', avatar: 'NC' },
    { name: 'Tracy C. Dyson', role: 'Flight Engineer', avatar: 'TD' },
    { name: 'Matthew Dominick', role: 'Flight Engineer', avatar: 'MD' },
    { name: 'Mike Barratt', role: 'Flight Engineer', avatar: 'MB' },
    { name: 'Jeanette Epps', role: 'Flight Engineer', avatar: 'JE' },
    { name: 'Alexander Grebenkin', role: 'Flight Engineer', avatar: 'AG' },
];

const ISSWidget = () => {
    const [issData, setIssData] = useState<ISSData | null>(null);
    const [prevIssData, setPrevIssData] = useState<ISSData | null>(null);
    const [mapUrl, setMapUrl] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const mountedRef = useRef(true);

    const calculateDirection = (current: ISSData, previous: ISSData) => {
        const deltaLat = current.latitude - previous.latitude;
        const deltaLon = current.longitude - previous.longitude;

        let adjustedDeltaLon = deltaLon;
        if (deltaLon > 180) adjustedDeltaLon = deltaLon - 360;
        if (deltaLon < -180) adjustedDeltaLon = deltaLon + 360;

        let angle = Math.atan2(adjustedDeltaLon, deltaLat);
        let degrees = angle * (180 / Math.PI);

        degrees = degrees + 90;

        if (degrees < 0) degrees += 360;
        if (degrees >= 360) degrees -= 360;

        return degrees;
    };

    useEffect(() => {
        if (issData && prevIssData) {
            const newRotation = calculateDirection(issData, prevIssData);
            setRotation(newRotation);
        }
    }, [issData, prevIssData]);

    useEffect(() => {
        mountedRef.current = true;

        const fetchISSData = async () => {
            try {
                const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                if (!response.ok) throw new Error('Failed to fetch ISS data');
                const data: ISSData = await response.json();

                if (mountedRef.current) {
                    if (issData) setPrevIssData(issData);

                    setIssData(data);

                    const mapIframeUrl = `https://api.maptiler.com/maps/satellite/?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}#2/${data.latitude}/${data.longitude}`;
                    setMapUrl(mapIframeUrl);
                    setLastUpdate(new Date());
                    setError(null);

                    if (initialLoading) setInitialLoading(false);
                }
            } catch (err) {
                if (mountedRef.current) {
                    if (err instanceof Error) setError(err.message);
                    else setError('An unknown error occurred.');
                    if (initialLoading) setInitialLoading(false);
                }
            }
        };

        fetchISSData();

        const interval = setInterval(fetchISSData, 3000);

        return () => {
            mountedRef.current = false;
            clearInterval(interval);
        };
    }, []);

    const formatLastUpdate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleTimeString();
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Satellite className="w-6 h-6 text-accent" />
                        <CardTitle className="font-headline">ISS Tracker</CardTitle>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-muted-foreground">LIVE</span>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Rocket />
                                View 3D Model
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-screen h-screen max-w-full max-h-full flex flex-col p-0 m-0">
                            <DialogHeader className="p-4 border-b bg-background">
                                <DialogTitle>International Space Station - 3D Model</DialogTitle>
                            </DialogHeader>
                            <div className="flex-grow w-full h-full">
                                <iframe
                                    src="https://solarsystem.nasa.gov/gltf_embed/2378/"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen
                                    className="w-full h-full"
                                    title="NASA 3D ISS Model"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <CardDescription>
                    Real-time telemetry & crew
                    {lastUpdate && (
                        <span className="ml-2 text-xs opacity-70">
                            • Updated {formatLastUpdate(lastUpdate)}
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="relative aspect-video rounded-md overflow-hidden bg-muted mb-4" style={{ minHeight: 200 }}>
                    {initialLoading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-2">
                            <Loader className="w-8 h-8 animate-spin text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Locating ISS...</span>
                        </div>
                    ) : error ? (
                        <div className="text-destructive p-4 text-center text-sm h-full flex items-center justify-center">
                            {error}
                        </div>
                    ) : mapUrl ? (
                        <>
                            <iframe
                                key={mapUrl}
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                className="w-full h-full rounded-md"
                                title="ISS Live Location Map"
                                style={{
                                    pointerEvents: 'none',
                                    userSelect: 'none'
                                }}
                                tabIndex={-1}
                            />

                            <div
                                className="absolute inset-0 bg-transparent"
                                style={{ pointerEvents: 'all', cursor: 'default' }}
                            />

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="relative">
                                    <div
                                        className="absolute w-10 h-0.5 bg-red-400/90 rounded-full transition-transform duration-1000 shadow-lg"
                                        style={{
                                            transform: `rotate(${rotation}deg)`,
                                            transformOrigin: 'center',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-1px',
                                            marginLeft: '-20px'
                                        }}
                                    />

                                    <div className="bg-white/95 rounded-full p-3 shadow-2xl border-3 border-red-500 relative z-10">
                                        <Satellite
                                            className="w-7 h-7 text-red-600 transition-transform duration-1000 ease-in-out drop-shadow-lg"
                                            style={{ transform: `rotate(${rotation}deg)` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {issData && (
                                <div className="absolute bottom-2 left-2 bg-black/80 text-white px-3 py-1.5 rounded-md text-xs pointer-events-none shadow-lg">
                                    <div className="font-mono">
                                        Lat: {issData.latitude.toFixed(4)}°<br />
                                        Lon: {issData.longitude.toFixed(4)}°
                                    </div>
                                </div>
                            )}

                            <div className="absolute top-2 right-2 bg-green-500/90 text-white px-2 py-1 rounded-md text-xs pointer-events-none shadow-lg">
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    AUTO-FOLLOW
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-muted-foreground p-4 text-center text-sm h-full flex items-center justify-center">
                            Could not load map data.
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                        <ChevronsUp className="w-4 h-4 text-muted-foreground" />
                        <span>Altitude: {issData ? `${issData.altitude.toFixed(2)} km` : '...'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Orbit className="w-4 h-4 text-muted-foreground" />
                        <span>Velocity: {issData ? `${issData.velocity.toFixed(2)} km/h` : '...'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="capitalize">Visibility: {issData ? issData.visibility : '...'}</span>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 flex-grow">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" /> Current Crew ({crew.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {crew.map(member => (
                            <div key={member.name} className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{member.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-xs font-semibold">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ISSWidget;
