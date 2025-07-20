import APOD from '@/components/APOD';
import AsteroidTracker from '@/components/AsteroidTracker';
import EarthImage from '@/components/EarthImage';
import ISSWidget from '@/components/ISSWidget';
import MarsWeather from '@/components/MarsWeather';

const Dashboard = () => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-12">
      <div className="col-span-12">
        <APOD />
      </div>
      <div className="md:col-span-6 lg:col-span-8">
        <EarthImage />
      </div>
      <div className="md:col-span-6 lg:col-span-4">
        <MarsWeather />
      </div>
      <div className="col-span-12">
        <AsteroidTracker />
      </div>
      <div className="col-span-12">
        <ISSWidget />
      </div>
    </div>
  );
};

export default Dashboard;
