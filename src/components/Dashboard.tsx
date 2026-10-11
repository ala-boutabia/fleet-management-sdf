import React from 'react';
import { Vehicle, Driver, MaintenanceRecord } from '../types';

interface DashboardProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  maintenance: MaintenanceRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ vehicles, drivers, maintenance }) => {
  const activeVehicles = vehicles.filter((v) => v.status === 'active').length;
  const idleVehicles = vehicles.filter((v) => v.status === 'idle').length;
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'maintenance').length;
  const offlineVehicles = vehicles.filter((v) => v.status === 'offline').length;
  const availableDrivers = drivers.filter((d) => d.status === 'available').length;
  const onDutyDrivers = drivers.filter((d) => d.status === 'on-duty').length;
  const avgFuel = Math.round(vehicles.reduce((sum, v) => sum + v.fuelLevel, 0) / vehicles.length);
  const overdueMaintenance = maintenance.filter((m) => m.status === 'overdue').length;
  const totalMileage = vehicles.reduce((sum, v) => sum + v.mileage, 0);

  const stats = [
    {
      label: 'Total Vehicles',
      value: vehicles.length,
      icon: 'fa-truck',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 text-blue-600',
      subtext: `${activeVehicles} active, ${idleVehicles} idle`,
    },
    {
      label: 'Active Drivers',
      value: onDutyDrivers,
      icon: 'fa-user-group',
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50 text-emerald-600',
      subtext: `${availableDrivers} available`,
    },
    {
      label: 'In Maintenance',
      value: maintenanceVehicles,
      icon: 'fa-wrench',
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50 text-amber-600',
      subtext: `${overdueMaintenance} overdue`,
    },
    {
      label: 'Avg Fuel Level',
      value: `${avgFuel}%`,
      icon: 'fa-gas-pump',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50 text-purple-600',
      subtext: `${offlineVehicles} offline`,
    },
  ];

  const recentActivity = [
    { text: 'Vehicle FL-4521 started route to Downtown Hub', time: '5 min ago', type: 'info' },
    { text: 'Maintenance completed for FL-6673', time: '1 hour ago', type: 'success' },
    { text: 'Driver Sarah Chen assigned to FL-7832', time: '2 hours ago', type: 'info' },
    { text: 'Overdue maintenance alert for FL-2210', time: '3 hours ago', type: 'warning' },
    { text: 'Vehicle FL-1190 entered service center', time: '5 hours ago', type: 'warning' },
    { text: 'Fuel alert: FL-2210 below 15%', time: '6 hours ago', type: 'danger' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Fleet overview and key metrics</p>
        </div>
        <div className="text-sm text-slate-500">
          <i className="fa-regular fa-calendar mr-2"></i>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.subtext}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.lightColor} flex items-center justify-center`}>
                <i className={`fa-solid ${stat.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Fleet Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-slate-600">Active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(activeVehicles / vehicles.length) * 100}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-slate-700 w-8">{activeVehicles}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-slate-600">Idle</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(idleVehicles / vehicles.length) * 100}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-slate-700 w-8">{idleVehicles}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm text-slate-600">Maintenance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(maintenanceVehicles / vehicles.length) * 100}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-slate-700 w-8">{maintenanceVehicles}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                <span className="text-sm text-slate-600">Offline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: `${(offlineVehicles / vehicles.length) * 100}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-slate-700 w-8">{offlineVehicles}</span>
              </div>
            </div>
          </div>

          {/* Summary bar */}
          <div className="mt-6 flex rounded-full overflow-hidden h-3">
            <div className="bg-emerald-500" style={{ width: `${(activeVehicles / vehicles.length) * 100}%` }}></div>
            <div className="bg-blue-500" style={{ width: `${(idleVehicles / vehicles.length) * 100}%` }}></div>
            <div className="bg-amber-500" style={{ width: `${(maintenanceVehicles / vehicles.length) * 100}%` }}></div>
            <div className="bg-slate-400" style={{ width: `${(offlineVehicles / vehicles.length) * 100}%` }}></div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'success' ? 'bg-emerald-500' :
                  activity.type === 'warning' ? 'bg-amber-500' :
                  activity.type === 'danger' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 truncate">{activity.text}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Mileage */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-road"></i>
            </div>
            <h3 className="font-semibold text-slate-800">Total Mileage</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalMileage.toLocaleString()} km</p>
          <p className="text-sm text-emerald-600 mt-1">
            <i className="fa-solid fa-arrow-up mr-1"></i>+12.5% from last month
          </p>
        </div>

        {/* Driver Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-star"></i>
            </div>
            <h3 className="font-semibold text-slate-800">Avg Rating</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {(drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1)} / 5.0
          </p>
          <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <i key={star} className={`fa-solid fa-star text-amber-400 mr-1 ${
                star <= Math.round(drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length) ? '' : 'opacity-30'
              }`}></i>
            ))}
          </div>
        </div>

        {/* Maintenance Costs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
            <h3 className="font-semibold text-slate-800">Maintenance Costs</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            ${maintenance.reduce((sum, m) => sum + m.cost, 0).toLocaleString()}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {maintenance.filter((m) => m.status === 'scheduled').length} scheduled
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
