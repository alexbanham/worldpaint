# WorldPaint

> Claim your territory by moving through the world

WorldPaint is a mobile app that records your GPS location in the background and visualizes the hex cells you've claimed on a beautiful Mapbox map.

**⚠️ Read [ENGINEERING_RULES.md](./ENGINEERING_RULES.md) before contributing.**

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **macOS** with Xcode (14.0 or later)
- **Node.js** 18+ and **pnpm** (`npm install -g pnpm`)
- **Expo CLI** (`npm install -g expo-cli` or `npx expo`)
- **EAS CLI** (`npm install -g eas-cli`)
- A **Mapbox account** with:
  - Public token (starts with `pk.`)
  - Secret/downloads token (starts with `sk.`)

---

## Getting Started

### 1. Clone and Install

```bash
git clone <repo-url>
cd worldpaint
pnpm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp env.example .env
```

Edit `.env` and add your **Mapbox public token**:

```bash
EXPO_PUBLIC_MAPBOX_TOKEN=pk_YOUR_PUBLIC_TOKEN_HERE
```

**Note:** The `MAPBOX_DOWNLOADS_TOKEN` (secret token) should **NOT** be stored in `.env` for local development. It's only used during EAS builds and should be set in the EAS project secrets (see below).

### 3. Run in iOS Simulator

Since this app uses Mapbox (a native module), you **cannot** use Expo Go. You must build a custom dev client or use `expo run:ios`.

#### Option A: Quick Start (iOS Simulator)

```bash
pnpm prebuild
pnpm ios
```

This will:
1. Generate native iOS projects (`expo prebuild --clean`)
2. Build and launch the app in the iOS Simulator

#### Option B: Custom Dev Client for Physical Device

To run on a real iPhone:

1. **Initialize EAS project:**

```bash
eas init
```

Follow the prompts to create/link an EAS project.

2. **Set Mapbox Downloads Token in EAS:**

```bash
eas secret:create --name MAPBOX_DOWNLOADS_TOKEN --value sk_YOUR_SECRET_TOKEN_HERE --type string --scope project
```

3. **Build the dev client:**

```bash
eas build -p ios --profile development
```

Wait for the build to complete (~10-20 minutes). You'll get a URL to download the `.tar.gz` or install directly on your device.

4. **Install on device** (via EAS or manually via Xcode).

5. **Start Metro bundler:**

```bash
pnpm start
```

6. **Scan the QR code** with your camera app to open the app on your device.

---

## Project Structure

```
worldpaint/
├── App.tsx                      # App entry point
├── app.config.ts                # Expo configuration
├── eas.json                     # EAS build profiles
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx     # React Navigation setup
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Start/Stop tracking UI
│   │   └── MapScreen.tsx        # Mapbox map with H3 cells
│   ├── services/
│   │   └── location.ts          # Background location tracking
│   ├── geo/
│   │   └── h3.ts                # H3 hex utilities
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── ENGINEERING_RULES.md         # Engineering standards
└── README.md                    # This file
```

---

## Features

### MVP (Current)

- ✅ Background GPS tracking with iOS location permissions
- ✅ Buffered location storage (AsyncStorage)
- ✅ Mapbox map with user location puck
- ✅ Sample H3 hex cell rendering (one polygon)
- ✅ Start/Stop tracking controls
- ✅ Custom Expo dev client support

### Coming Soon

- 🔲 Convert captured GPS points to H3 cells
- 🔲 Render all claimed cells on the map
- 🔲 Backend API for data sync
- 🔲 Activity history and stats
- 🔲 Privacy zones (exclude sensitive locations)

---

## Usage

1. **Launch the app** in the iOS Simulator or on your device.
2. **Tap "Start Tracking"** to begin background GPS collection.
   - You'll be prompted to grant location permissions (Always Allow required for background).
3. **Tap "Open Map"** to view the Mapbox map with your location and a sample H3 cell.
4. **Simulate movement** (in Simulator: Features > Location > Custom Location or Freeway Drive).
5. **Tap "Stop Tracking"** to stop background updates and persist remaining buffered points.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm start` | Start Metro bundler (use with dev client) |
| `pnpm ios` | Run app in iOS Simulator |
| `pnpm prebuild` | Generate native iOS/Android projects |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |

---

## Known Issues & Gotchas

- **Expo Go will not work** because Mapbox requires native modules. You must use a custom dev client or `expo run:ios`.
- **Background location on Simulator:** The iOS Simulator can simulate location, but background tracking behavior differs from a real device. Test on a physical iPhone for accurate results.
- **Mapbox token errors:** Ensure `EXPO_PUBLIC_MAPBOX_TOKEN` is set in `.env` and `MAPBOX_DOWNLOADS_TOKEN` is set in EAS secrets for builds.
- **First build slow:** The first `expo run:ios` or EAS build will take 10-20 minutes due to native module compilation.

---

## Development Workflow

1. Make changes to the code.
2. If you modified native code or added a new native module, run `pnpm prebuild` again.
3. Run `pnpm ios` to rebuild and launch.
4. For faster iteration, keep Metro running (`pnpm start`) and use the dev client on your device.

---

## Testing Location

### iOS Simulator

- Go to **Features > Location** in the Simulator menu.
- Choose a preset (e.g., Apple, City Run, Freeway Drive) or set a custom location.
- The app will receive location updates.

### Physical Device

- Walk, run, or drive with your phone.
- The app will record your actual movement.

---

## Next Steps

- [ ] Implement H3 cell conversion from GPS points
- [ ] Render all claimed cells dynamically
- [ ] Add backend API for data ingestion and sync
- [ ] Implement activity history and statistics
- [ ] Add privacy zones (geofencing to exclude sensitive areas)
- [ ] Android support
- [ ] Leaderboards and social features

---

## Architecture Notes

- **Location Service:** Background task manager collects GPS points every 3 seconds or 5 meters, buffering them in memory and persisting to AsyncStorage in batches.
- **H3 Integration:** Uses `h3-js` to convert GPS coordinates to hex cells (resolution 8 by default).
- **Map Rendering:** Mapbox GL with GeoJSON sources for efficient vector tile rendering.
- **No Backend Yet:** All data stays on-device. Future versions will sync to a cloud backend.

---

## Contributing

Please read [ENGINEERING_RULES.md](./ENGINEERING_RULES.md) before submitting PRs.

---

## License

Proprietary (for now)

---

## Support

For issues or questions, contact the team or open a GitHub issue.

