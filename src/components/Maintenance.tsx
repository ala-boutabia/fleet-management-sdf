import React, { useState } from 'react';
import { MaintenanceRecord, Vehicle } from '../types';

interface MaintenanceProps {
  records: MaintenanceRecord[];
  vehicles: Vehicle[];
}

const Maintenance: React.FC<MaintenanceProps> = ({ records, vehicles }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRecords = records.filter((r) => {
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesType = filterType === 'all' || r.type === filterType;
    return matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-amber-100 text-amber-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'oil-change': return 'Oil Change';
      case 'tire-rotation': return 'Tire Rotation';
      case 'brake-inspection': return 'Brake Inspection';
      case 'engine-repair': return 'Engine Repair';
      case 'general': return 'General';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'oil-change': return 'fa-oil-can';
      case 'tire-rotation': return 'fa-circle-dot';
      case 'brake-inspection': return 'fa-compact-disc';
      case 'engine-repair': return 'fa-gear';
      case 'general': return 'fa-toolbox';
      default: return 'fa-wrench';
    }
  };

  const getVehiclePlate = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? vehicle.plate : 'Unknown';
  };

  const getVehicleModel = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown';
  };

  const totalCost = records.reduce((sum, r) => sum + r.cost, 0);
  const scheduledCount = records.filter((r) => r.status === 'scheduled').length;
  const inProgressCount = records.filter((r) => r.status === 'in-progress').length;
  const overdueCount = records.filter((r) => r.status === 'overdue').length;
  const completedCount = records.filter((r) => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Maintenance</h1>
          <p className="text-slate-500">Track and schedule vehicle maintenance</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i>
          Schedule Maintenance
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-calendar-check text-sm"></i>
            </div>
            <span className="text-sm text-slate-500">Scheduled</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{scheduledCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-spinner text-sm"></i>
            </div>
            <span className="text-sm text-slate-500">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{inProgressCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-exclamation-triangle text-sm"></i>
            </div>
            <span className="text-sm text-slate-500">Overdue</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-dollar-sign text-sm"></i>
            </div>
            <span className="text-sm text-slate-500">Total Cost</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">${totalCost.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Types</option>
            <option value="oil-change">Oil Change</option>
            <option value="tire-rotation">Tire Rotation</option>
            <option value="brake-inspection">Brake Inspection</option>
            <option value="engine-repair">Engine Repair</option>
            <option value="general">General</option>
          </select>
          <div className="ml-auto text-sm text-slate-500">
            {completedCount} completed • {records.length} total
          </div>
        </div>
      </div>

      {/* Maintenance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mechanic</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cost</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">{getVehiclePlate(record.vehicleId)}</p>
                      <p className="text-xs text-slate-500">{getVehicleModel(record.vehicleId)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <i className={`fa-solid ${getTypeIcon(record.type)} text-slate-500 text-sm`}></i>
                      </div>
                      <span className="text-sm text-slate-700">{getTypeLabel(record.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700 max-w-[200px] truncate">{record.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{record.scheduledDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{record.mechanic}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">${record.cost.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status === 'in-progress' ? 'In Progress' : record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Maintenance Timeline</h3>
        <div className="space-y-4">
          {records
            .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
            .map((record) => (
              <div key={record.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    record.status === 'completed' ? 'bg-emerald-500' :
                    record.status === 'in-progress' ? 'bg-amber-500' :
                    record.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="w-0.5 h-8 bg-slate-200"></div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">{getVehiclePlate(record.vehicleId)}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-sm text-slate-600">{getTypeLabel(record.type)}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{record.description}</p>
                  <p className="text-xs text-slate-400 mt-1">{record.scheduledDate} • {record.mechanic}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status === 'in-progress' ? 'In Progress' : record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
