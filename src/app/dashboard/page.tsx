import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Dashboard />
    </div>
  );
}
