# ENGINEERING RULES (WorldPaint)

This document defines the engineering principles and standards for the WorldPaint codebase. All contributors must follow these rules.

## DRY & Modularity
No copy-paste. Shared logic lives in `src/lib` or a dedicated hook/module. Components <200 LoC where practical.

## Interfaces First
Define types/interfaces up front (`src/types`) for location samples, activity state, hex features.

## No Over-Engineering
MVP over patterns. Avoid abstractions until duplicated at least twice. YAGNI.

## Seams for Growth
Public APIs and services should have narrow, testable functions. Keep background tracking logic and map rendering separate modules.

## Config via Env
No secrets in code. Use `.env`, `app.config.ts` extra, and EAS env for tokens. Commit `env.example`, never `.env`.

## Error Handling
Fail soft in UI; log to console for now. Never crash the recorder silently. Wrap async calls; guard null states.

## Performance
Prefer vector tiles and GeoJSON layers. Batch writes to storage. Coalesce GPS points; don't render thousands of features at once at high zoom.

## Mobile UX
Respect OS policies. Show a clear "recording" state. Use `pausesUpdatesAutomatically` and `ActivityType.Fitness`.

## Privacy by Default
No location leaves device yet (MVP). Private zones/redaction will be added later—design modules with that in mind.

## Documentation
Every exported function gets a short JSDoc. README stays current with run and build steps.

## Code Style
Prettier formatting; ESLint basic rules. No unused exports/vars. Prefer functional components + hooks.

## Git Hygiene
Small commits with clear messages. No committing build artifacts or secrets.

---

**Reference this doc at the top of the README.**

