import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Telescope } from 'lucide-react';

const APOD = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2">
        <Telescope className="w-6 h-6 text-accent" />
        <CardTitle className="font-headline">Astronomy Picture of the Day</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative aspect-video rounded-md overflow-hidden mb-4">
          <Image
            src="https://placehold.co/600x400"
            alt="The Veil Nebula"
            fill
            className="object-cover"
            data-ai-hint="nebula galaxy"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">The Veil Nebula Supernova Remnant</h3>
        <CardDescription>
          This is a picture of the Veil Nebula, a cloud of heated and ionized gas and dust in the constellation Cygnus. It constitutes the visible portions of the Cygnus Loop, a supernova remnant.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Image Credit: NASA, ESA, Hubble Heritage Team</p>
      </CardFooter>
    </Card>
  );
};

export default APOD;
