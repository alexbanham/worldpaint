# Installation & Verification Checklist

Use this checklist to verify your WorldPaint setup is complete and working.

## Pre-Installation

- [ ] macOS with Xcode 14.0+ installed
- [ ] Xcode Command Line Tools installed (`xcode-select --install`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] Mapbox account created at https://account.mapbox.com/

## Initial Setup

- [ ] Dependencies installed (`pnpm install`)
- [ ] `.env` file created from `env.example`
- [ ] `EXPO_PUBLIC_MAPBOX_TOKEN` added to `.env` (starts with `pk.`)
- [ ] Git initialized (`git init`)
- [ ] Initial commit made

## iOS Simulator Test

- [ ] Run `pnpm prebuild` successfully (no errors)
- [ ] Run `pnpm ios` successfully
- [ ] App launches in iOS Simulator
- [ ] Home screen displays with "WorldPaint" title
- [ ] "Start Tracking", "Stop Tracking", and "Open Map" buttons visible
- [ ] Status shows "Idle"
- [ ] Buffered Points shows "0"

## Map Screen Test

- [ ] Tap "Open Map" button
- [ ] Map screen loads without errors
- [ ] Mapbox map renders (street view)
- [ ] Blue location puck appears (may need to wait a few seconds)
- [ ] Blue hexagonal cell (H3 sample) is visible on map
- [ ] Camera centers on user location
- [ ] Can pan/zoom the map

## Location Tracking Test

- [ ] Tap "Start Tracking" on Home screen
- [ ] Location permission alert appears
- [ ] Grant "While Using the App" permission
- [ ] Alert prompts to grant "Always Allow" permission
- [ ] Grant "Always Allow" permission
- [ ] Status changes to "Recording" with green badge
- [ ] Start button becomes disabled (grayed out)
- [ ] Stop button becomes enabled

## Simulated Movement Test (Simulator)

- [ ] With tracking active, go to Features > Location in Simulator menu
- [ ] Select "City Run" or "Freeway Drive"
- [ ] Watch console logs for `[bg-location] Received N location(s)` messages
- [ ] Buffered Points counter increases over time
- [ ] After 10+ points, see `[location] Persisted N points` in console

## Background Tracking Test

- [ ] With tracking active, press Home button (Cmd+Shift+H)
- [ ] Wait 10-20 seconds
- [ ] Reopen WorldPaint from app switcher
- [ ] Verify Buffered Points increased while app was backgrounded
- [ ] Verify status still shows "Recording"

## Stop Tracking Test

- [ ] Tap "Stop Tracking" button
- [ ] Alert appears: "Tracking Stopped"
- [ ] Status changes to "Idle" with gray badge
- [ ] Console shows `[location] Background tracking stopped`
- [ ] Console shows `[location] Persisted N points` (if any buffered)
- [ ] Stop button becomes disabled
- [ ] Start button becomes enabled

## Code Quality Check

- [ ] Run `pnpm lint` - no errors (warnings OK)
- [ ] Run `pnpm format` - formats successfully
- [ ] All TypeScript files compile without errors

## Documentation Check

- [ ] `README.md` exists and is readable
- [ ] `ENGINEERING_RULES.md` exists
- [ ] `SETUP.md` exists
- [ ] `QUICK_START.md` exists
- [ ] `PROJECT_SUMMARY.md` exists
- [ ] `env.example` exists (not `.env`)

## EAS Setup (Optional - For Device Testing)

- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Run `eas init` successfully
- [ ] EAS project created/linked
- [ ] `MAPBOX_DOWNLOADS_TOKEN` added to EAS secrets (starts with `sk.`)
- [ ] Build profile verified in `eas.json`

## Device Build Test (Optional)

- [ ] Run `eas build -p ios --profile development`
- [ ] Build completes successfully (10-20 min)
- [ ] Download and install dev client on iPhone
- [ ] Run `pnpm start` on computer
- [ ] Scan QR code with iPhone camera
- [ ] App opens in dev client
- [ ] All Home screen tests pass on device
- [ ] All Map screen tests pass on device
- [ ] Real GPS tracking works (walk/drive with phone)

## Production Readiness (Future)

- [ ] Replace placeholder assets (icon.png, splash.png)
- [ ] Update bundle identifier from `com.yourorg.worldpaint`
- [ ] Add crash reporting (Sentry, Bugsnag)
- [ ] Add analytics (if needed)
- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] App Store Connect setup
- [ ] TestFlight testing

## Common Issues Resolved

- [ ] No "Expo Go required" error (using dev client)
- [ ] No Mapbox token errors
- [ ] No permission denied errors
- [ ] No build/compile errors
- [ ] No TypeScript errors
- [ ] No runtime crashes

## Ready for Development?

If all checks above pass (except optional ones), you're ready to:

- ✅ Start implementing Phase 2 features
- ✅ Convert GPS points to H3 cells
- ✅ Render dynamic claimed cells
- ✅ Add backend API integration
- ✅ Build additional screens

---

**Status: [  ] MVP Verified | [  ] Ready for Development | [  ] Production Ready**

Date: ________________

Notes:
_____________________________________________________________________________
_____________________________________________________________________________
_____________________________________________________________________________

