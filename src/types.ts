export interface Vehicle {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  type: 'truck' | 'van' | 'car' | 'bus';
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  mileage: number;
  fuelLevel: number;
  driverId: string | null;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  phone: string;
  email: string;
  status: 'available' | 'on-duty' | 'off-duty';
  vehicleId: string | null;
  rating: number;
  tripsCompleted: number;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'oil-change' | 'tire-rotation' | 'brake-inspection' | 'engine-repair' | 'general';
  description: string;
  scheduledDate: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  cost: number;
  mechanic: string;
}

export interface FleetMetric {
  totalVehicles: number;
  activeVehicles: number;
  idleVehicles: number;
  maintenanceVehicles: number;
  totalDrivers: number;
  availableDrivers: number;
  fuelConsumption: number;
  totalMileage: number;
  maintenanceDue: number;
  avgDriverRating: number;
}
