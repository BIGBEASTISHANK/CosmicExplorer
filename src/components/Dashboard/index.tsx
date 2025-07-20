import APOD from '@/components/APOD';
import AsteroidTracker from '@/components/AsteroidTracker';
import EarthImage from '@/components/EarthImage';
import ISSWidget from '@/components/ISSWidget';
import MarsWeather from '@/components/MarsWeather';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        <APOD />
        <AsteroidTracker />
        <ISSWidget />
      </div>
      
      {/* Right Column */}
      <div className="lg:col-span-4 flex flex-col gap-8">
        <MarsWeather />
        <EarthImage />
      </div>
    </div>
  );
};

export default Dashboard;
