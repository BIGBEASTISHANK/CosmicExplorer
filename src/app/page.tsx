"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';
import type { VantaGlobe } from '@/types/vanta';
import Script from 'next/script';

declare global {
  interface Window {
    VANTA: {
      GLOBE: (options: VantaGlobe) => any;
    };
    THREE: any;
  }
}

export default function Home() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    let effect: any = null;
    if (typeof window !== 'undefined' && window.THREE && window.VANTA) {
      effect = window.VANTA.GLOBE({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x0,
        color: 0x9833ea,
        size: 1.2,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
        strategy="afterInteractive"
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <section ref={vantaRef} className="relative w-full h-[calc(100vh-3.5rem)] flex items-center justify-center">
            <div className="relative z-10 text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Cosmic Explorer
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
                Your portal to the universe. Explore real-time data from NASA, from the surface of Mars to the vastness of near-Earth space.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard">
                  Launch Dashboard <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
