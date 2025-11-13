import 'dotenv/config';

export default {
  expo: {
    name: 'WorldPaint',
    slug: 'worldpaint',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    scheme: 'worldpaint',
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.yourorg.worldpaint',
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'We use your location to color cells you traverse on the map.',
        NSLocationAlwaysAndWhenInUseUsageDescription:
          'We use your location in the background while recording an activity.',
        UIBackgroundModes: ['location'],
        UIApplicationShowsBackgroundLocationIndicator: true,
      },
    },
    android: {
      package: 'com.yourorg.worldpaint',
      permissions: [
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'ACCESS_BACKGROUND_LOCATION',
        'FOREGROUND_SERVICE',
      ],
    },
    plugins: [
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsVersion: '11.0.0',
          RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOADS_TOKEN,
        },
      ],
    ],
    extra: {
      MAPBOX_PUBLIC_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_TOKEN,
      eas: {
        projectId: 'your-eas-project-id',
      },
    },
  },
};

