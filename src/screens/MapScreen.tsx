/**
 * MapScreen: Displays Mapbox map with user location and H3 hex cells
 */

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Constants from 'expo-constants';
import { h3CellToFeature } from '../geo/h3';

// Sample H3 cell to demonstrate rendering (San Francisco area, resolution 8)
const SAMPLE_CELL = '8828308281fffff';

export default function MapScreen() {
  useEffect(() => {
    // Initialize Mapbox with access token from env
    const token = Constants.expoConfig?.extra?.MAPBOX_PUBLIC_TOKEN;
    if (token) {
      Mapbox.setAccessToken(token);
    } else {
      console.error('[MapScreen] MAPBOX_PUBLIC_TOKEN not found in app config');
    }
  }, []);

  // Convert sample H3 cell to GeoJSON
  const sampleFeature = h3CellToFeature(SAMPLE_CELL);
  const geoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [sampleFeature],
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} styleURL={Mapbox.StyleURL.Street}>
        <Mapbox.Camera
          followUserLocation
          followZoomLevel={14}
          animationMode="flyTo"
          animationDuration={1000}
        />

        <Mapbox.UserLocation visible showsUserHeadingIndicator />

        {/* Render sample H3 cell */}
        <Mapbox.ShapeSource id="h3-cells-source" shape={geoJson}>
          <Mapbox.FillLayer
            id="h3-cells-fill"
            style={{
              fillColor: '#3b82f6',
              fillOpacity: 0.3,
            }}
          />
          <Mapbox.LineLayer
            id="h3-cells-outline"
            style={{
              lineColor: '#1e40af',
              lineWidth: 2,
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

