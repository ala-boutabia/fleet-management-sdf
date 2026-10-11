import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Vehicles from './components/Vehicles';
import Drivers from './components/Drivers';
import Maintenance from './components/Maintenance';
import { vehicles, drivers, maintenanceRecords } from './data';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard vehicles={vehicles} drivers={drivers} maintenance={maintenanceRecords} />;
      case 'vehicles':
        return <Vehicles vehicles={vehicles} drivers={drivers} />;
      case 'drivers':
        return <Drivers drivers={drivers} vehicles={vehicles} />;
      case 'maintenance':
        return <Maintenance records={maintenanceRecords} vehicles={vehicles} />;
      default:
        return <Dashboard vehicles={vehicles} drivers={drivers} maintenance={maintenanceRecords} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"
        >
          <i className="fa-solid fa-bars text-slate-600"></i>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-truck-fast text-white text-sm"></i>
          </div>
          <span className="font-bold text-slate-800">FleetPulse</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar activeView={activeView} setActiveView={(view) => { setActiveView(view); setSidebarOpen(false); }} />
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
