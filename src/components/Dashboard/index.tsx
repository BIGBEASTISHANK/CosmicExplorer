"use client";

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import type { VantaDots } from '@/types/vanta';
import APOD from '@/components/APOD';
import AsteroidTracker from '@/components/AsteroidTracker';
import EarthImage from '@/components/EarthImage';
import ISSWidget from '@/components/ISSWidget';
import MarsWeather from '@/components/MarsWeather';

declare global {
  interface Window {
    VANTA: {
      DOTS: (options: VantaDots) => any;
    };
    THREE: any;
  }
}

const Dashboard = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  const initVanta = () => {
    if (vantaEffect) {
      vantaEffect.destroy();
    }
    if (window.VANTA && window.VANTA.DOTS) {
      const effect = window.VANTA.DOTS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x111111,
        color: 0xBE52F2,
        color2: 0x0B3D91,
        showLines: false,
        size: 3.5,
        spacing: 30.00
      });
      setVantaEffect(effect);
    }
  };
  
  useEffect(() => {
    // This effect will run on component mount if VANTA is already available
    // from a previous page navigation.
    if (window.VANTA && window.VANTA.DOTS) {
      initVanta();
    }
    
    // The cleanup function will run when the component unmounts.
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []); // The empty dependency array ensures this runs only once on mount and cleanup on unmount.


  return (
    <>
      {/* The `onLoad` callback ensures `initVanta` is called only after the script has loaded. */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
        strategy="afterInteractive"
        onLoad={initVanta}
      />
      <div ref={vantaRef} className="fixed inset-0 -z-10" />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 lg:row-span-2">
            <EarthImage />
          </div>
          <div className="lg:col-span-1">
            <MarsWeather />
          </div>
          <div className="lg:col-span-1">
            <ISSWidget />
          </div>
          <div className="lg:col-span-1">
            <APOD />
          </div>
          <div className="lg:col-span-2">
            <AsteroidTracker />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
