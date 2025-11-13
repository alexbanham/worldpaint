/**
 * HomeScreen: Start/Stop tracking and navigate to map
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  startBackgroundTracking,
  stopBackgroundTracking,
  getBufferCount,
} from '../services/location';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isTracking, setIsTracking] = useState(false);
  const [bufferCount, setBufferCount] = useState(0);

  // Poll buffer count every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const count = await getBufferCount();
      setBufferCount(count);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    const success = await startBackgroundTracking();
    if (success) {
      setIsTracking(true);
      Alert.alert('Tracking Started', 'Background location updates are now active.');
    } else {
      Alert.alert(
        'Permission Denied',
        'Please grant location permissions to use this feature.'
      );
    }
  };

  const handleStop = async () => {
    const success = await stopBackgroundTracking();
    if (success) {
      setIsTracking(false);
      Alert.alert('Tracking Stopped', 'Background location updates have been stopped.');
    }
  };

  const handleOpenMap = () => {
    navigation.navigate('Map');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>WorldPaint</Text>
        <Text style={styles.subtitle}>Claim your territory by moving through the world</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <View style={[styles.statusBadge, isTracking && styles.statusBadgeActive]}>
            <Text style={[styles.statusText, isTracking && styles.statusTextActive]}>
              {isTracking ? 'Recording' : 'Idle'}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Buffered Points: {bufferCount}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, isTracking && styles.buttonDisabled]}
            onPress={handleStart}
            disabled={isTracking}
          >
            <Text style={styles.buttonText}>Start Tracking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, !isTracking && styles.buttonDisabled]}
            onPress={handleStop}
            disabled={!isTracking}
          >
            <Text style={styles.buttonText}>Stop Tracking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={handleOpenMap}
          >
            <Text style={[styles.buttonText, styles.buttonTextOutline]}>Open Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
  },
  statusBadgeActive: {
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  statusTextActive: {
    color: '#ffffff',
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statsText: {
    fontSize: 16,
    color: '#374151',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
  },
  buttonSecondary: {
    backgroundColor: '#ef4444',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonTextOutline: {
    color: '#3b82f6',
  },
});

