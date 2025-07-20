import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[calc(100vh-3.5rem)] flex items-center justify-center">
          <Image
            src="https://placehold.co/1920x1080"
            alt="Cosmic background"
            fill
            className="absolute inset-0 z-0 object-cover opacity-30"
            data-ai-hint="galaxy stars"
          />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Cosmic Explorer
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              Your portal to the universe. Explore real-time data from NASA, from the surface of Mars to the vastness of near-Earth space.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">
                Launch Dashboard <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
