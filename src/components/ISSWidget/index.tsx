"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Satellite, Loader } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ISSData = {
    latitude: number;
    longitude: number;
};

const ISSWidget = () => {
    const [issData, setIssData] = useState<ISSData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const crew = [
        { name: 'Oleg Kononenko', role: 'Commander, Expedition 71', avatar: 'OK' },
        { name: 'Nikolai Chub', role: 'Flight Engineer', avatar: 'NC' },
        { name: 'Tracy C. Dyson', role: 'Flight Engineer', avatar: 'TD' },
        { name: 'Matthew Dominick', role: 'Flight Engineer', avatar: 'MD' },
        { name: 'Mike Barratt', role: 'Flight Engineer', avatar: 'MB' },
        { name: 'Jeanette Epps', role: 'Flight Engineer', avatar: 'JE' },
        { name: 'Alexander Grebenkin', role: 'Flight Engineer', avatar: 'AG' },
    ];

    useEffect(() => {
        const fetchISSData = async () => {
            try {
                const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                if (!response.ok) {
                    throw new Error('Failed to fetch ISS data');
                }
                const data: ISSData = await response.json();
                setIssData(data);
                setError(null);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchISSData(); // Initial fetch
        const interval = setInterval(fetchISSData, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Satellite className="w-6 h-6 text-accent" />
                    <CardTitle className="font-headline">ISS Tracker</CardTitle>
                </div>
                <CardDescription>Real-time location & crew</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="relative aspect-video rounded-md overflow-hidden mb-4 bg-muted">
                    <Image src="https://placehold.co/400x200" alt="Map of ISS location" fill className="object-cover" data-ai-hint="world map" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <MapPin className="w-8 h-8 text-destructive animate-pulse" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
                        {loading && <div className="flex items-center gap-1"><Loader className="w-3 h-3 animate-spin" /> Loading...</div>}
                        {error && `Error: ${error}`}
                        {issData && !loading && `Lat: ${issData.latitude.toFixed(2)}, Lon: ${issData.longitude.toFixed(2)}`}
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3 flex-grow">
                    <h4 className="text-sm font-medium flex items-center gap-2"><Users className="w-4 h-4" /> Current Crew ({crew.length})</h4>
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
