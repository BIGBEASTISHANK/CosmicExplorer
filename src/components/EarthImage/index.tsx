"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from 'lucide-react';

const EarthImage = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleString('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }));
    }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2">
        <Globe className="w-6 h-6 text-accent" />
        <CardTitle className="font-headline">Live Earth View</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow relative rounded-md overflow-hidden">
        <Image
          src="https://placehold.co/600x600"
          alt="Live view of Earth from space"
          fill
          className="object-cover"
          data-ai-hint="earth space"
        />
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
          {currentDate || 'Loading date...'}
        </div>
      </CardContent>
    </Card>
  );
};

export default EarthImage;
