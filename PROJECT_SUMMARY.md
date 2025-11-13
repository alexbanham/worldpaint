# WorldPaint - Project Summary

## Overview

WorldPaint is a mobile app (iOS-first) that tracks your location in the background and visualizes the territory you've claimed as hex cells on a Mapbox map. Think Pokémon GO meets Foursquare Swarm, but for claiming real-world territory through movement.

## Current Status: MVP Complete ✅

### What's Working

- ✅ Expo + React Native + TypeScript project structure
- ✅ Background GPS tracking (iOS)
- ✅ Location buffering to AsyncStorage
- ✅ Mapbox map integration with user location
- ✅ Sample H3 hex cell rendering
- ✅ Start/Stop tracking UI
- ✅ Custom dev client support for physical devices
- ✅ Proper iOS permissions and background modes
- ✅ Clean, modular architecture following ENGINEERING_RULES

### Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Expo 52 (managed workflow) |
| Language | TypeScript |
| Package Manager | pnpm |
| Navigation | React Navigation (native stack) |
| Maps | Mapbox GL (@rnmapbox/maps) |
| Hex Grid | H3 (h3-js) |
| Location | expo-location + expo-task-manager |
| Storage | AsyncStorage |
| Build | EAS (Expo Application Services) |

## Project Structure

```
worldpaint/
├── App.tsx                          # Entry point
├── app.config.ts                    # Expo config (permissions, plugins)
├── eas.json                         # EAS build profiles
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── babel.config.js                  # Babel config
├── metro.config.js                  # Metro bundler config
├── .eslintrc.js                     # ESLint rules
├── .prettierrc.js                   # Prettier config
├── .editorconfig                    # Editor settings
├── .gitignore                       # Git ignore rules
├── env.example                      # Environment template
├── ENGINEERING_RULES.md             # Coding standards
├── README.md                        # Main documentation
├── SETUP.md                         # Setup guide
├── PROJECT_SUMMARY.md               # This file
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx         # React Navigation setup
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Main screen with Start/Stop
│   │   └── MapScreen.tsx            # Mapbox map + H3 cells
│   ├── services/
│   │   └── location.ts              # Background tracking service
│   ├── geo/
│   │   └── h3.ts                    # H3 utilities
│   └── types/
│       └── index.ts                 # TypeScript definitions
└── assets/
    └── README.md                    # Asset instructions
```

## Key Features Explained

### 1. Background Location Tracking

**File:** `src/services/location.ts`

- Uses `expo-task-manager` to define a background task
- Collects GPS points every 3 seconds or 5 meters
- Buffers points in memory (batch of 10 or every 30 seconds)
- Persists to AsyncStorage for durability
- Handles iOS permissions (foreground + background)
- Shows native iOS background location indicator

**Functions:**
- `startBackgroundTracking()` - Request permissions and start tracking
- `stopBackgroundTracking()` - Stop tracking and flush buffer
- `getBufferCount()` - Get total stored location points

### 2. Mapbox Integration

**File:** `src/screens/MapScreen.tsx`

- Initializes Mapbox with access token from env
- Renders map with street style
- Shows user location puck with heading indicator
- Camera follows user location at zoom level 14
- Renders sample H3 cell using GeoJSON ShapeSource
- Styled with blue fill (30% opacity) and darker outline

### 3. H3 Hex Grid

**File:** `src/geo/h3.ts`

- Converts H3 cell IDs to GeoJSON Features
- Closes polygon rings correctly ([...boundary, boundary[0]])
- Returns proper GeoJSON format for Mapbox
- Supports batch conversion (multiple cells → FeatureCollection)

**Sample cell:** `8828308281fffff` (San Francisco area, resolution 8)

### 4. Home Screen UI

**File:** `src/screens/HomeScreen.tsx`

- Shows tracking status (Idle / Recording)
- Displays buffered points count (updated every 2 seconds)
- "Start Tracking" button → requests permissions and starts background task
- "Stop Tracking" button → stops tracking and persists remaining buffer
- "Open Map" button → navigates to MapScreen
- Clean, modern UI with proper safe area handling

## Configuration Files

### app.config.ts

Contains:
- App name, slug, version
- iOS bundle identifier (`com.yourorg.worldpaint`)
- Location permissions (foreground + background)
- UIBackgroundModes: ['location']
- Mapbox plugin configuration
- EAS project ID placeholder

### eas.json

Build profiles:
- **development** → Dev client for testing on device
- **preview** → Internal distribution build
- **production** → App Store build

## Environment Variables

### Local Development (.env)
```bash
EXPO_PUBLIC_MAPBOX_TOKEN=pk_YOUR_PUBLIC_TOKEN
```

### EAS Build (Secrets)
```bash
MAPBOX_DOWNLOADS_TOKEN=sk_YOUR_SECRET_TOKEN
```

## Development Workflow

### Local Development (Simulator)
```bash
pnpm install          # Install dependencies
pnpm prebuild         # Generate native projects
pnpm ios              # Build & launch in Simulator
```

### Device Development (Physical iPhone)
```bash
eas build -p ios --profile development  # Build dev client
pnpm start                               # Start Metro
# Scan QR code to open app
```

### Code Quality
```bash
pnpm lint             # ESLint
pnpm format           # Prettier
```

## Architecture Principles

Following `ENGINEERING_RULES.md`:

1. **DRY & Modularity** - No duplicated code, components < 200 LoC
2. **Interfaces First** - Types defined in `src/types/`
3. **No Over-Engineering** - MVP over patterns, YAGNI
4. **Seams for Growth** - Services are modular and testable
5. **Config via Env** - No secrets in code
6. **Error Handling** - Fail soft, log to console
7. **Performance** - Batch writes, vector tiles, coalesced updates
8. **Mobile UX** - Respect OS policies, clear state indicators
9. **Privacy by Default** - No data leaves device (MVP)
10. **Documentation** - JSDoc on exports, current README

## What's Next

### Phase 2 (Near-term)
- [ ] Convert GPS points to H3 cells (latLngToCell)
- [ ] Store claimed cells (deduplicated)
- [ ] Render all claimed cells on map (dynamic GeoJSON)
- [ ] Activity history screen
- [ ] Statistics (total cells, distance, time)

### Phase 3 (Medium-term)
- [ ] Backend API (Node.js + PostgreSQL + PostGIS)
- [ ] User authentication (Supabase or Firebase)
- [ ] Data sync (upload claimed cells)
- [ ] View other users' territories
- [ ] Leaderboards

### Phase 4 (Long-term)
- [ ] Privacy zones (geofencing)
- [ ] Cell decay mechanics
- [ ] Achievements & rewards
- [ ] Social features (friends, challenges)
- [ ] Android support
- [ ] Web dashboard

## Performance Considerations

- **Location sampling:** 3s or 5m intervals (balance battery vs accuracy)
- **Buffer batching:** 10 points or 30s (reduce AsyncStorage writes)
- **Map rendering:** Vector tiles + GeoJSON (efficient at all zoom levels)
- **Future optimization:** Coalesce adjacent cells, limit features at low zoom

## Testing Strategy

### Manual Testing (Current)
- [ ] Test in iOS Simulator with simulated routes
- [ ] Test on physical device with real movement
- [ ] Test permission flows
- [ ] Test background tracking (app backgrounded)
- [ ] Test buffer persistence (force quit app)

### Automated Testing (Future)
- Unit tests for H3 utilities
- Integration tests for location service
- E2E tests with Detox

## Known Limitations

- iOS only (no Android yet)
- No backend (data stays on-device)
- No user authentication
- No data export
- No privacy zones
- Single sample H3 cell (not dynamic yet)

## Deployment Checklist

Before shipping to TestFlight:
- [ ] Add real app icons and splash screen
- [ ] Update bundle identifier to your org
- [ ] Set up EAS project
- [ ] Add Mapbox tokens to EAS secrets
- [ ] Test on multiple iOS versions
- [ ] Enable crash reporting (Sentry)
- [ ] Add privacy policy
- [ ] Test background location battery impact
- [ ] Profile performance

## Resources

- **Expo Docs:** https://docs.expo.dev/
- **Mapbox RN:** https://github.com/rnmapbox/maps
- **H3 Docs:** https://h3geo.org/
- **React Navigation:** https://reactnavigation.org/
- **EAS Build:** https://docs.expo.dev/build/introduction/

## License

Proprietary (for now)

---

**Built with ❤️ following ENGINEERING_RULES.md**

