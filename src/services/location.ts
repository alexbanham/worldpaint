/**
 * Background location tracking service
 * Handles requesting permissions, starting/stopping background updates,
 * and buffering location samples to AsyncStorage
 */

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationSample, locationObjectToSample } from '../types';

export const BG_TASK = 'bg-location';

const BUFFER_KEY = '@worldpaint:location_buffer';
const BATCH_SIZE = 10; // Persist after every N points
const BATCH_TIME_MS = 30000; // Or every 30 seconds

let inMemoryBuffer: LocationSample[] = [];
let lastPersistTime = Date.now();

/**
 * Persists the in-memory buffer to AsyncStorage
 */
async function persistBuffer() {
  if (inMemoryBuffer.length === 0) return;

  try {
    const existing = await AsyncStorage.getItem(BUFFER_KEY);
    const existingData: LocationSample[] = existing ? JSON.parse(existing) : [];
    const updated = [...existingData, ...inMemoryBuffer];

    await AsyncStorage.setItem(BUFFER_KEY, JSON.stringify(updated));
    console.log(`[location] Persisted ${inMemoryBuffer.length} points. Total: ${updated.length}`);

    inMemoryBuffer = [];
    lastPersistTime = Date.now();
  } catch (error) {
    console.error('[location] Failed to persist buffer:', error);
  }
}

/**
 * TaskManager definition for background location updates
 */
TaskManager.defineTask(BG_TASK, async ({ data, error }) => {
  if (error) {
    console.error('[bg-location] Task error:', error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    console.log(`[bg-location] Received ${locations.length} location(s)`);

    // Convert and buffer
    const samples = locations.map(locationObjectToSample);
    inMemoryBuffer.push(...samples);

    // Persist if batch size or time threshold reached
    const shouldPersist =
      inMemoryBuffer.length >= BATCH_SIZE || Date.now() - lastPersistTime >= BATCH_TIME_MS;

    if (shouldPersist) {
      await persistBuffer();
    }
  }
});

/**
 * Requests foreground and background location permissions
 * @returns true if both permissions granted
 */
async function requestPermissions(): Promise<boolean> {
  try {
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
    if (fgStatus !== 'granted') {
      console.warn('[location] Foreground permission denied');
      return false;
    }

    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus !== 'granted') {
      console.warn('[location] Background permission denied');
      return false;
    }

    return true;
  } catch (error) {
    console.error('[location] Permission request failed:', error);
    return false;
  }
}

/**
 * Starts background location tracking
 * @returns true if successfully started
 */
export async function startBackgroundTracking(): Promise<boolean> {
  try {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      return false;
    }

    const isRegistered = await TaskManager.isTaskRegisteredAsync(BG_TASK);
    if (isRegistered) {
      console.log('[location] Task already registered, stopping first');
      await Location.stopLocationUpdatesAsync(BG_TASK);
    }

    await Location.startLocationUpdatesAsync(BG_TASK, {
      accuracy: Location.Accuracy.High,
      timeInterval: 3000,
      distanceInterval: 5,
      pausesUpdatesAutomatically: true,
      activityType: Location.ActivityType.Fitness,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'WorldPaint',
        notificationBody: 'Recording your activity…',
      },
    });

    console.log('[location] Background tracking started');
    return true;
  } catch (error) {
    console.error('[location] Failed to start tracking:', error);
    return false;
  }
}

/**
 * Stops background location tracking and persists remaining buffer
 * @returns true if successfully stopped
 */
export async function stopBackgroundTracking(): Promise<boolean> {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BG_TASK);
    if (isRegistered) {
      await Location.stopLocationUpdatesAsync(BG_TASK);
      console.log('[location] Background tracking stopped');
    }

    // Persist any remaining buffered points
    if (inMemoryBuffer.length > 0) {
      await persistBuffer();
    }

    return true;
  } catch (error) {
    console.error('[location] Failed to stop tracking:', error);
    return false;
  }
}

/**
 * Gets the current buffer count from AsyncStorage
 */
export async function getBufferCount(): Promise<number> {
  try {
    const stored = await AsyncStorage.getItem(BUFFER_KEY);
    if (!stored) return 0;
    const data: LocationSample[] = JSON.parse(stored);
    return data.length;
  } catch (error) {
    console.error('[location] Failed to get buffer count:', error);
    return 0;
  }
}

/**
 * Clears all stored location samples (for testing/debugging)
 */
export async function clearBuffer(): Promise<void> {
  try {
    await AsyncStorage.removeItem(BUFFER_KEY);
    inMemoryBuffer = [];
    console.log('[location] Buffer cleared');
  } catch (error) {
    console.error('[location] Failed to clear buffer:', error);
  }
}

