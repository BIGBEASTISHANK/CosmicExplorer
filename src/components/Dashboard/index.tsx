import APOD from '@/components/APOD';
import AsteroidTracker from '@/components/AsteroidTracker';
import EarthImage from '@/components/EarthImage';
import ISSWidget from '@/components/ISSWidget';
import MarsWeather from '@/components/MarsWeather';
import SpaceWeather from '@/components/SpaceWeather';

const Dashboard = () => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
      <div className="lg:col-span-2 xl:col-span-2">
        <APOD />
      </div>
      <div className="lg:col-span-1 xl:col-span-2">
        <EarthImage />
      </div>
      <div className="lg:col-span-3 xl:col-span-4">
        <SpaceWeather />
      </div>
      <div className="lg:col-span-1 xl:col-span-1">
        <MarsWeather />
      </div>
      <div className="lg:col-span-1 xl:col-span-1">
        <ISSWidget />
      </div>
      <div className="lg:col-span-1 xl:col-span-2">
        <AsteroidTracker />
      </div>
    </div>
  );
};

export default Dashboard;
