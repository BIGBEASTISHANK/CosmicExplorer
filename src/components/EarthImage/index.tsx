"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Satellite, Clock } from 'lucide-react';

const EarthImage = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            setCurrentDate(new Date().toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
            }));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center gap-2">
                <Globe className="w-6 h-6 text-accent" />
                <CardTitle className="font-headline">Live Earth View</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow relative rounded-md overflow-hidden p-0">
                <iframe
                    src="https://solarsystem.nasa.gov/gltf_embed/2393/"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full min-h-[400px]"
                    title="NASA 3D Earth Globe"
                />
                
                {/* Info overlay */}
                <div className="absolute bottom-2 left-2 space-y-1">
                    <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {currentDate}
                    </div>
                    <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                        <Satellite className="w-4 h-4" />
                        NASA 3D Globe
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EarthImage;
