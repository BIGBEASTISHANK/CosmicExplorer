"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { summarizeSpaceWeather, type SpaceWeatherSummaryInput } from '@/ai/flows/summarize-space-weather';
import { Calendar as CalendarIcon, Bot } from 'lucide-react';

const SpaceWeather = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [summary, setSummary] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const handleSummarize = async () => {
        if (!date) {
            toast({
                title: 'Error',
                description: 'Please select a date.',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);
        setSummary('');
        try {
            const input: SpaceWeatherSummaryInput = {
                date: format(date, 'yyyy-MM-dd'),
            };
            const result = await summarizeSpaceWeather(input);
            setSummary(result.summary);
        } catch (error) {
            console.error(error);
            toast({
                title: 'AI Summary Failed',
                description: 'Could not generate the space weather summary. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-accent" />
                    <CardTitle className="font-headline">AI Space Weather Briefing</CardTitle>
                </div>
                <CardDescription>
                    Get an AI-generated summary of space weather events for any given day using NASA's Space Weather Database.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-[280px] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(d) => d > new Date() || d < new Date("1995-01-01")}
                            />
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleSummarize} disabled={loading} className="w-full sm:w-auto">
                        {loading ? 'Generating...' : 'Generate Briefing'}
                    </Button>
                </div>
                <div className="p-4 border rounded-md min-h-[120px] bg-muted/50">
                    {loading && (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[75%]" />
                        </div>
                    )}
                    {summary && <p className="text-sm leading-relaxed">{summary}</p>}
                    {!loading && !summary && (
                        <p className="text-sm text-muted-foreground">Select a date and generate a briefing to see the summary here.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SpaceWeather;
