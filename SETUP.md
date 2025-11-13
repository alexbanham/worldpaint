# WorldPaint Setup Guide

This guide walks you through setting up the WorldPaint app from scratch.

## Prerequisites Checklist

- [ ] macOS with Xcode 14.0+ installed
- [ ] Node.js 18+ installed (`node --version`)
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] Expo CLI available (`npm install -g expo-cli` or use `npx expo`)
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Mapbox account with public token (pk.*) and secret token (sk.*)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd worldpaint
pnpm install
```

This will install all required npm packages including:
- Expo SDK 52
- React Native
- Mapbox Maps
- H3 (hex grid library)
- React Navigation
- Location services
- AsyncStorage

### 2. Configure Environment

```bash
# Copy the example environment file
cp env.example .env

# Edit .env and add your Mapbox public token
# EXPO_PUBLIC_MAPBOX_TOKEN=pk_YOUR_TOKEN_HERE
```

**Important:** Get your Mapbox tokens from https://account.mapbox.com/access-tokens/

You need:
- **Public token (pk.*)** → Add to `.env` file
- **Secret/Downloads token (sk.*)** → Add to EAS secrets (next step)

### 3. Initialize Git (Optional but Recommended)

```bash
git init
git add .
git commit -m "Initial commit: WorldPaint MVP"
```

### 4. Test in iOS Simulator (Quick Start)

```bash
# Generate native projects
pnpm prebuild

# Build and launch in iOS Simulator
pnpm ios
```

**Expected behavior:**
- App launches in iOS Simulator
- Home screen shows "Start Tracking" and "Open Map" buttons
- Tapping "Open Map" shows a Mapbox map with your (simulated) location
- A blue sample H3 hex cell is visible on the map

**Troubleshooting:**
- If you see "Mapbox token not found", check that your `.env` file exists and has `EXPO_PUBLIC_MAPBOX_TOKEN` set
- If the build fails, try `pnpm prebuild` again to regenerate native projects
- If Simulator doesn't launch, open Xcode and ensure you have an iOS Simulator installed

### 5. Set Up EAS for Device Builds (For Physical iPhone)

```bash
# Initialize EAS project
eas init

# Follow prompts to create/link an EAS project

# Add your Mapbox secret token to EAS
eas secret:create \
  --name MAPBOX_DOWNLOADS_TOKEN \
  --value sk_YOUR_SECRET_TOKEN \
  --type string \
  --scope project

# Build a development client
eas build -p ios --profile development
```

Wait 10-20 minutes for the build. Once complete, you can:
- Install the `.ipa` on your device via EAS dashboard
- Or install via Xcode if you downloaded the build artifacts

### 6. Run on Physical Device

```bash
# Start Metro bundler
pnpm start

# Scan QR code with your iPhone camera
# Open the WorldPaint dev client app
```

## Verifying the Setup

### Test Checklist

- [ ] App launches without crashes
- [ ] Home screen displays correctly
- [ ] "Open Map" navigates to Mapbox map
- [ ] Map shows user location puck (blue dot)
- [ ] Sample H3 hex cell is visible (blue polygon)
- [ ] "Start Tracking" prompts for location permissions
- [ ] After granting permissions, "Status" changes to "Recording"
- [ ] "Buffered Points" count increases over time (when moving)
- [ ] "Stop Tracking" stops recording

### Simulating Movement (iOS Simulator)

1. With the app running, go to **Features > Location** in the Simulator menu
2. Choose **City Run** or **Freeway Drive**
3. Watch the buffered points count increase
4. Open the map to see your location update

## Next Steps

Once the app is running:

1. **Test background tracking:**
   - Start tracking
   - Press home button (Cmd+Shift+H)
   - Simulate location changes
   - Return to app and verify buffered points increased

2. **Explore the code:**
   - Read `ENGINEERING_RULES.md` for coding standards
   - Check `src/services/location.ts` for background GPS logic
   - Review `src/screens/MapScreen.tsx` for Mapbox implementation

3. **Customize:**
   - Change the sample H3 cell in `MapScreen.tsx`
   - Adjust location tracking intervals in `src/services/location.ts`
   - Modify UI colors/styles in screen components

## Common Issues

### "EXPO_PUBLIC_MAPBOX_TOKEN is not defined"
- Ensure `.env` file exists in project root
- Verify the token starts with `pk.`
- Restart Metro bundler after changing `.env`

### "Mapbox download failed" during build
- Add `MAPBOX_DOWNLOADS_TOKEN` to EAS secrets
- Ensure the secret token starts with `sk.`

### "Location permission denied"
- In iOS Settings > Privacy & Security > Location Services
- Enable for WorldPaint and set to "Always"

### Build fails with "Pod install failed"
- Delete `ios/` folder
- Run `pnpm prebuild` again
- Ensure you're using the correct Xcode version

### App crashes on launch
- Check Metro bundler logs for errors
- Verify all dependencies installed: `pnpm install`
- Try clearing cache: `npx expo start -c`

## Getting Help

- Read the [README.md](./README.md) for architecture details
- Check [ENGINEERING_RULES.md](./ENGINEERING_RULES.md) for coding standards
- Review Expo docs: https://docs.expo.dev/
- Mapbox RN docs: https://github.com/rnmapbox/maps

---

**You're all set! Start building and claiming territory! 🗺️**

