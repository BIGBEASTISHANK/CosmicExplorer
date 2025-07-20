"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type Asteroid = {
    name: string;
    date: string;
    diameter: string;
    hazardous: boolean;
};

const allAsteroids: Asteroid[] = [
    { name: '(2024 MK)', date: '2024-06-29', diameter: '187 m', hazardous: true },
    { name: '(2011 UL21)', date: '2024-06-27', diameter: '2.3 km', hazardous: true },
    { name: '415029 (2011 UL21)', date: '2024-08-14', diameter: '30 m', hazardous: false },
    { name: '(2023 FZ3)', date: '2024-09-01', diameter: '89 m', hazardous: false },
    { name: '99942 Apophis', date: '2029-04-13', diameter: '370 m', hazardous: true },
    { name: '(2007 FT3)', date: '2024-10-05', diameter: '340 m', hazardous: false },
];

const AsteroidTracker = () => {
    const [showHazardousOnly, setShowHazardousOnly] = useState(false);

    const filteredAsteroids = showHazardousOnly
        ? allAsteroids.filter(a => a.hazardous)
        : allAsteroids;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  <CardTitle className="font-headline">Near-Earth Asteroids</CardTitle>
                </div>
                <CardDescription>Tracking objects approaching Earth's orbit.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                    <Switch
                        id="hazardous-only"
                        checked={showHazardousOnly}
                        onCheckedChange={setShowHazardousOnly}
                    />
                    <Label htmlFor="hazardous-only">Show potentially hazardous only</Label>
                </div>
                <div className="flex-grow border rounded-lg">
                  <ScrollArea className="h-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Close Approach</TableHead>
                                <TableHead className="text-right">Hazardous</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAsteroids.map((asteroid) => (
                                <TableRow key={asteroid.name}>
                                    <TableCell className="font-medium">{asteroid.name}</TableCell>
                                    <TableCell>{asteroid.date}</TableCell>
                                    <TableCell className="text-right">
                                        {asteroid.hazardous ? (
                                            <Badge variant="destructive">Yes</Badge>
                                        ) : (
                                            <Badge variant="secondary">No</Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
};

export default AsteroidTracker;
