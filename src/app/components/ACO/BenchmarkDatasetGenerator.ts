// LOGICORTEX ACO - Deterministic Benchmark Dataset Generator

import { BenchmarkDataset, Shipment, Driver, Vehicle, Route } from '../../types/aco';

// Seeded random number generator for reproducibility
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  nextArrayItem<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }
}

export class BenchmarkDatasetGenerator {
  private rng: SeededRandom;

  constructor(seed: number = 42) {
    this.rng = new SeededRandom(seed);
  }

  generateDataset(scale: 'small' | 'medium' | 'large' | 'stress', seed: number = 42): BenchmarkDataset {
    this.rng = new SeededRandom(seed);

    const scaleConfig = {
      small: { shipments: 10, drivers: 5, vehicles: 3 },
      medium: { shipments: 50, drivers: 10, vehicles: 8 },
      large: { shipments: 100, drivers: 20, vehicles: 15 },
      stress: { shipments: 200, drivers: 30, vehicles: 25 }
    };

    const config = scaleConfig[scale];

    return {
      scale,
      seed,
      shipments: this.generateShipments(config.shipments),
      drivers: this.generateDrivers(config.drivers),
      vehicles: this.generateVehicles(config.vehicles),
      routes: this.generateRoutes()
    };
  }

  private generateShipments(count: number): Shipment[] {
    const origins = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
    const destinations = ['Miami', 'Seattle', 'Denver', 'Boston', 'Atlanta', 'Dallas', 'Portland', 'Las Vegas'];
    const priorities: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];
    const inventoryItems = ['Electronics', 'Furniture', 'Clothing', 'Food', 'Machinery', 'Medical Supplies', 'Auto Parts'];

    const shipments: Shipment[] = [];

    for (let i = 0; i < count; i++) {
      const now = new Date();
      const deadline = new Date(now.getTime() + this.rng.nextInt(2, 48) * 60 * 60 * 1000); // 2-48 hours

      shipments.push({
        id: `SHP-${String(i + 1).padStart(4, '0')}`,
        origin: this.rng.nextArrayItem(origins),
        destination: this.rng.nextArrayItem(destinations),
        priority: this.rng.nextArrayItem(priorities),
        weight: this.rng.nextFloat(10, 5000), // kg
        volume: this.rng.nextFloat(0.1, 50), // cubic meters
        deadline,
        timeWindow: {
          start: new Date(now.getTime() + this.rng.nextInt(0, 2) * 60 * 60 * 1000),
          end: deadline
        },
        inventoryRequirements: this.rng.nextArrayItem(inventoryItems).split(',').map(s => s.trim()),
        estimatedValue: this.rng.nextFloat(1000, 100000)
      });
    }

    return shipments;
  }

  private generateDrivers(count: number): Driver[] {
    const firstNames = ['Raj', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Rahul', 'Pooja', 'Arjun', 'Kavita'];
    const lastNames = ['Kumar', 'Sharma', 'Patel', 'Reddy', 'Singh', 'Verma', 'Gupta', 'Malhotra', 'Chopra', 'Mehta'];
    const locations = [
      { lat: 40.7128, lng: -74.0060 }, // New York
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles
      { lat: 41.8781, lng: -87.6298 }, // Chicago
      { lat: 29.7604, lng: -95.3698 }, // Houston
    ];
    const statuses: Array<'available' | 'busy' | 'delayed' | 'offline'> = ['available', 'busy', 'delayed', 'offline'];
    const skills = ['local', 'long_haul', 'hazardous', 'refrigerated', 'heavy_machinery'];

    const drivers: Driver[] = [];

    for (let i = 0; i < count; i++) {
      const now = new Date();
      const status = this.rng.nextArrayItem(statuses);
      
      drivers.push({
        id: `DRV-${String(i + 1).padStart(3, '0')}`,
        name: `${this.rng.nextArrayItem(firstNames)} ${this.rng.nextArrayItem(lastNames)}`,
        status,
        location: this.rng.nextArrayItem(locations),
        currentLoad: status === 'busy' ? this.rng.nextInt(5, 12) : this.rng.nextInt(0, 3),
        maxCapacity: 15,
        efficiency: this.rng.nextInt(70, 98),
        skills: [this.rng.nextArrayItem(skills), this.rng.nextArrayItem(skills)].filter((v, i, a) => a.indexOf(v) === i),
        availabilityWindow: {
          start: new Date(now.getTime() - this.rng.nextInt(0, 8) * 60 * 60 * 1000),
          end: new Date(now.getTime() + this.rng.nextInt(8, 24) * 60 * 60 * 1000)
        }
      });
    }

    return drivers;
  }

  private generateVehicles(count: number): Vehicle[] {
    const types: Array<'truck' | 'van' | 'motorcycle'> = ['truck', 'van', 'motorcycle'];
    const statuses: Array<'available' | 'busy' | 'maintenance'> = ['available', 'busy', 'maintenance'];
    const maintenanceStatuses: Array<'good' | 'fair' | 'poor'> = ['good', 'fair', 'poor'];
    const locations = [
      { lat: 40.7128, lng: -74.0060 },
      { lat: 34.0522, lng: -118.2437 },
      { lat: 41.8781, lng: -87.6298 },
      { lat: 29.7604, lng: -95.3698 },
    ];

    const vehicles: Vehicle[] = [];

    for (let i = 0; i < count; i++) {
      const type = this.rng.nextArrayItem(types);
      const status = this.rng.nextArrayItem(statuses);
      
      vehicles.push({
        id: `VHC-${String(i + 1).padStart(3, '0')}`,
        type,
        status,
        capacity: type === 'truck' ? this.rng.nextInt(8000, 15000) : type === 'van' ? this.rng.nextInt(2000, 5000) : this.rng.nextInt(100, 500),
        currentLocation: this.rng.nextArrayItem(locations),
        fuelLevel: this.rng.nextInt(20, 100),
        maintenanceStatus: status === 'maintenance' ? 'poor' : this.rng.nextArrayItem(maintenanceStatuses)
      });
    }

    return vehicles;
  }

  private generateRoutes(): Route[] {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Miami', 'Seattle', 'Denver', 'Boston', 'Atlanta', 'Dallas', 'Portland', 'Las Vegas'];
    const trafficConditions: Array<'light' | 'moderate' | 'heavy'> = ['light', 'moderate', 'heavy'];
    const riskLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];

    const routes: Route[] = [];
    let routeId = 1;

    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (i !== j) {
          const distance = this.rng.nextInt(100, 3000);
          routes.push({
            id: `RTE-${String(routeId++).padStart(3, '0')}`,
            origin: cities[i],
            destination: cities[j],
            distance,
            estimatedTravelTime: Math.round(distance / this.rng.nextFloat(40, 80)), // Assume 40-80 km/h avg speed
            trafficCondition: this.rng.nextArrayItem(trafficConditions),
            riskLevel: this.rng.nextArrayItem(riskLevels),
            alternativeRoutes: []
          });
        }
      }
    }

    return routes;
  }

  // Helper to get route between two cities
  getRoute(origin: string, destination: string, routes: Route[]): Route | null {
    return routes.find(r => r.origin === origin && r.destination === destination) || null;
  }
}
