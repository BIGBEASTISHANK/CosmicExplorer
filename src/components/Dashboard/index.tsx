import APOD from '@/components/APOD';
import AsteroidTracker from '@/components/AsteroidTracker';
import EarthImage from '@/components/EarthImage';
import ISSWidget from '@/components/ISSWidget';
import MarsWeather from '@/components/MarsWeather';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Earth Image - takes up 2/3 of width on large screens */}
      <div className="lg:col-span-2">
        <EarthImage />
      </div>
      
      {/* Mars Weather */}
      <div className="lg:col-span-1">
        <MarsWeather />
      </div>

      {/* APOD */}
      <div className="lg:col-span-1">
        <APOD />
      </div>

      {/* Asteroid Tracker */}
      <div className="lg:col-span-1">
        <AsteroidTracker />
      </div>

      {/* ISS Tracker */}
      <div className="lg:col-span-1">
        <ISSWidget />
      </div>
    </div>
  );
};

export default Dashboard;
