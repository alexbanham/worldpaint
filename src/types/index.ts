/**
 * Core type definitions for WorldPaint
 */

import { LocationObject } from 'expo-location';

/**
 * A single location sample captured during tracking
 */
export interface LocationSample {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  timestamp: number;
}

/**
 * Current state of location tracking
 */
export interface ActivityState {
  isTracking: boolean;
  bufferCount: number;
  lastLocation: LocationSample | null;
}

/**
 * Converts an Expo LocationObject to our LocationSample format
 */
export function locationObjectToSample(loc: LocationObject): LocationSample {
  return {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
    altitude: loc.coords.altitude,
    accuracy: loc.coords.accuracy,
    speed: loc.coords.speed,
    heading: loc.coords.heading,
    timestamp: loc.timestamp,
  };
}

