"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Satellite, Clock, Loader, AlertTriangle } from 'lucide-react';

// API endpoint for recent image metadata
const EPIC_API_URL = 'https://epic.gsfc.nasa.gov/api/natural';

const EarthImage = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState<string | null>(null);
    const [earthImageUrl, setEarthImageUrl] = useState<string>('');

    useEffect(() => {
        const updateDateTime = () => {
            setCurrentDate(new Date().toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
            }));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        const fetchLatestEarthImage = async () => {
            setIsLoading(true);
            setImageError(null);
            try {
                const response = await fetch(EPIC_API_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch EPIC metadata (status: ${response.status})`);
                }
                const data = await response.json();
                
                if (data && data.length > 0) {
                    const latestImage = data[0];
                    const date = new Date(latestImage.date);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const imageName = latestImage.image;
                    
                    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${imageName}.png`;
                    setEarthImageUrl(imageUrl);
                } else {
                    throw new Error('No recent images found from EPIC API.');
                }
            } catch (error) {
                console.error("Error fetching latest Earth image:", error);
                if (error instanceof Error) {
                    setImageError(error.message);
                } else {
                    setImageError("An unknown error occurred.");
                }
                // Use a reliable fallback if the API fails
                setEarthImageUrl('https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200407.3x5400x2700.jpg');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatestEarthImage();

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleImageError = () => {
        console.error('Final image load failed, displaying error message.');
        setImageError("The Earth image could not be loaded.");
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center gap-2">
                <Globe className="w-6 h-6 text-accent" />
                <CardTitle className="font-headline">Live Earth View</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow relative rounded-md overflow-hidden bg-black flex items-center justify-center">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader className="w-8 h-8 animate-spin text-accent" />
                        <span className="text-sm text-muted-foreground">Loading Earth view...</span>
                    </div>
                ) : imageError && !earthImageUrl ? (
                    <div className="flex flex-col items-center gap-4 text-destructive p-4 text-center">
                        <AlertTriangle className="w-8 h-8" />
                        <span className="text-sm">{imageError}</span>
                    </div>
                ) : (
                    <>
                        <div 
                            className="relative rounded-full overflow-hidden border-4 border-blue-400/30 shadow-2xl"
                            style={{
                                width: '300px',
                                height: '300px',
                                animation: 'earthRotate 25s linear infinite',
                                boxShadow: '0 0 40px rgba(59, 130, 246, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            {earthImageUrl && (
                                <Image
                                    key={earthImageUrl} // Force re-render on URL change
                                    src={earthImageUrl}
                                    alt="Live view of Earth from space"
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-full"
                                    unoptimized
                                    priority // Prioritize loading this image
                                    onError={handleImageError}
                                />
                            )}
                        </div>
                        
                        <div className="absolute top-4 right-4">
                            <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <Satellite className="w-4 h-4" />
                                <span className="text-xs">LIVE</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 space-y-2">
                            <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {currentDate}
                            </div>
                            <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-xs">
                                NASA EPIC Imagery
                            </div>
                        </div>
                    </>
                )}
                
                <style jsx>{`
                    @keyframes earthRotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </CardContent>
        </Card>
    );
};

export default EarthImage;
