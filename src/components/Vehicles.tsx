import React, { useState } from 'react';
import { Vehicle, Driver } from '../types';

interface VehiclesProps {
  vehicles: Vehicle[];
  drivers: Driver[];
}

const Vehicles: React.FC<VehiclesProps> = ({ vehicles, drivers }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter((v) => {
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
    const matchesType = filterType === 'all' || v.type === filterType;
    const matchesSearch = v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'idle': return 'bg-blue-100 text-blue-700';
      case 'maintenance': return 'bg-amber-100 text-amber-700';
      case 'offline': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'truck': return 'fa-truck';
      case 'van': return 'fa-van-shuttle';
      case 'car': return 'fa-car';
      case 'bus': return 'fa-bus';
      default: return 'fa-truck';
    }
  };

  const getFuelColor = (level: number) => {
    if (level >= 60) return 'bg-emerald-500';
    if (level >= 30) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getDriverName = (driverId: string | null) => {
    if (!driverId) return 'Unassigned';
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? driver.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Vehicles</h1>
          <p className="text-slate-500">Manage your fleet vehicles</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i>
          Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="maintenance">Maintenance</option>
            <option value="offline">Offline</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Types</option>
            <option value="truck">Truck</option>
            <option value="van">Van</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
          </select>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle)}
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <i className={`fa-solid ${getTypeIcon(vehicle.type)} text-slate-600 text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{vehicle.plate}</h3>
                  <p className="text-sm text-slate-500">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  <i className="fa-solid fa-gauge-high mr-2"></i>Mileage
                </span>
                <span className="font-medium text-slate-700">{vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  <i className="fa-solid fa-gas-pump mr-2"></i>Fuel
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${getFuelColor(vehicle.fuelLevel)}`} style={{ width: `${vehicle.fuelLevel}%` }}></div>
                  </div>
                  <span className="font-medium text-slate-700">{vehicle.fuelLevel}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  <i className="fa-solid fa-user mr-2"></i>Driver
                </span>
                <span className="font-medium text-slate-700">{getDriverName(vehicle.driverId)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  <i className="fa-solid fa-location-dot mr-2"></i>Location
                </span>
                <span className="font-medium text-slate-700 text-right">{vehicle.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVehicle(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Vehicle Details</h2>
              <button onClick={() => setSelectedVehicle(null)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <i className={`fa-solid ${getTypeIcon(selectedVehicle.type)} text-2xl text-slate-600`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{selectedVehicle.plate}</h3>
                  <p className="text-slate-500">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedVehicle.status)}`}>
                    {selectedVehicle.status.charAt(0).toUpperCase() + selectedVehicle.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Mileage</p>
                  <p className="font-semibold text-slate-800">{selectedVehicle.mileage.toLocaleString()} km</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Fuel Level</p>
                  <p className="font-semibold text-slate-800">{selectedVehicle.fuelLevel}%</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Type</p>
                  <p className="font-semibold text-slate-800 capitalize">{selectedVehicle.type}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-semibold text-slate-800">{selectedVehicle.location}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Last Maintenance</p>
                  <p className="font-semibold text-slate-800">{selectedVehicle.lastMaintenance}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Next Maintenance</p>
                  <p className="font-semibold text-slate-800">{selectedVehicle.nextMaintenance}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Assigned Driver</p>
                <p className="font-semibold text-slate-800">{getDriverName(selectedVehicle.driverId)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
