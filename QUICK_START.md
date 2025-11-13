# Quick Start Guide

Get WorldPaint running in 5 minutes.

## Prerequisites

- macOS with Xcode installed
- Node.js 18+ and pnpm (`npm install -g pnpm`)

## Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment

```bash
# Copy environment template
cp env.example .env

# Edit .env and add your Mapbox token
# Get one at: https://account.mapbox.com/access-tokens/
```

Your `.env` should look like:

```
EXPO_PUBLIC_MAPBOX_TOKEN=pk_eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImFiYzEyMyJ9...
```

### 3. Run in iOS Simulator

```bash
pnpm prebuild && pnpm ios
```

This will:
1. Generate native iOS project
2. Install CocoaPods dependencies
3. Build and launch in iOS Simulator

**First build takes 5-10 minutes. Subsequent builds are faster.**

## What You'll See

1. **Home Screen**
   - "Start Tracking" button
   - "Open Map" button
   - Buffered points counter

2. **Map Screen** (tap "Open Map")
   - Mapbox street map
   - Blue dot showing your location
   - Blue hexagonal cell (sample H3 cell)

## Test It

1. **Grant Location Permissions**
   - Tap "Start Tracking"
   - Allow "While Using" → then "Always Allow"

2. **Simulate Movement** (in iOS Simulator)
   - Go to **Features > Location** in menu bar
   - Choose **Freeway Drive** or **City Run**

3. **Watch the Counter**
   - Buffered points should increase as location updates come in
   - Check console logs for `[bg-location]` messages

4. **Stop Tracking**
   - Tap "Stop Tracking"
   - Points are persisted to AsyncStorage

## Troubleshooting

**"Mapbox token not found"**
- Check `.env` file exists in project root
- Ensure token starts with `pk.`
- Restart Metro: `pnpm start --clear`

**Build fails**
- Run `pnpm prebuild` again
- Delete `node_modules` and run `pnpm install`
- Ensure Xcode Command Line Tools installed: `xcode-select --install`

**No location updates**
- In Simulator: Features > Location > Select a preset
- Check console for permission errors

## Next Steps

- Read [SETUP.md](./SETUP.md) for device builds
- Read [ENGINEERING_RULES.md](./ENGINEERING_RULES.md) before coding
- Read [README.md](./README.md) for full documentation

---

**Ready to claim the world! 🌍**

