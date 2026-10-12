import React, { useState } from 'react';
import { Driver, Vehicle } from '../types';

interface DriversProps {
  drivers: Driver[];
  vehicles: Vehicle[];
}

const Drivers: React.FC<DriversProps> = ({ drivers, vehicles }) => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter((d) => {
    const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.license.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-duty': return 'bg-emerald-100 text-emerald-700';
      case 'available': return 'bg-blue-100 text-blue-700';
      case 'off-duty': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getVehiclePlate = (vehicleId: string | null) => {
    if (!vehicleId) return 'None';
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? vehicle.plate : 'Unknown';
  };

  const getVehicleInfo = (vehicleId: string | null) => {
    if (!vehicleId) return null;
    return vehicles.find((v) => v.id === vehicleId);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fa-solid fa-star text-sm ${
              star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'
            }`}
          ></i>
        ))}
        <span className="ml-1 text-sm text-slate-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Drivers</h1>
          <p className="text-slate-500">Manage your fleet drivers</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i>
          Add Driver
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
                placeholder="Search drivers..."
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
            <option value="on-duty">On Duty</option>
            <option value="available">Available</option>
            <option value="off-duty">Off Duty</option>
          </select>
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => {
          const vehicle = getVehicleInfo(driver.vehicleId);
          return (
            <div
              key={driver.id}
              onClick={() => setSelectedDriver(driver)}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{driver.name}</h3>
                    <p className="text-sm text-slate-500">{driver.license}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                  {driver.status === 'on-duty' ? 'On Duty' : driver.status === 'available' ? 'Available' : 'Off Duty'}
                </span>
              </div>

              <div className="space-y-3">
                {renderStars(driver.rating)}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    <i className="fa-solid fa-phone mr-2"></i>Phone
                  </span>
                  <span className="font-medium text-slate-700">{driver.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    <i className="fa-solid fa-truck mr-2"></i>Vehicle
                  </span>
                  <span className="font-medium text-slate-700">{getVehiclePlate(driver.vehicleId)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    <i className="fa-solid fa-route mr-2"></i>Trips
                  </span>
                  <span className="font-medium text-slate-700">{driver.tripsCompleted}</span>
                </div>
              </div>

              {vehicle && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{vehicle.location}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Driver Detail Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedDriver(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Driver Details</h2>
              <button onClick={() => setSelectedDriver(null)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{selectedDriver.name}</h3>
                  <p className="text-slate-500">{selectedDriver.license}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedDriver.status)}`}>
                    {selectedDriver.status === 'on-duty' ? 'On Duty' : selectedDriver.status === 'available' ? 'Available' : 'Off Duty'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-800">{selectedDriver.phone}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-semibold text-slate-800 text-sm">{selectedDriver.email}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Rating</p>
                  <div className="mt-1">{renderStars(selectedDriver.rating)}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Trips Completed</p>
                  <p className="font-semibold text-slate-800">{selectedDriver.tripsCompleted}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Assigned Vehicle</p>
                <p className="font-semibold text-slate-800">{getVehiclePlate(selectedDriver.vehicleId)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;
