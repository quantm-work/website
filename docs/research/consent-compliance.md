# Cookie consent (GDPR + CCPA)

## Behavior

- **EU/EEA/UK/CH (opt-in):** Vercel `x-vercel-ip-country` → `requiresOptInBanner`. First visit shows a first-layer banner with **Customize / Reject All / Accept All** (equal primary styling). Non-essential scripts (GTM, GA4 direct, HubSpot, Warmly, Clay) stay off until consent. `NEXT_PUBLIC_CONSENT_VERSION` bumps invalidate stored prefs (default **2.0.0**); consent TTL **180 days**.
- **US opt-in subset (`NEXT_PUBLIC_CONSENT_US_OPT_IN`):** Aligns CIPA-related posture by optionally applying the same opt-in + pre-consent blocking as GDPR for California (default) or all US traffic. Uses `x-vercel-ip-country` + `x-vercel-ip-country-region` (debug: `?debug-region=us-ca`, `middleware` sets `x-fsds-consent-debug-region`).
  - **`off`** — US behaves like legacy **opt-out** (no blocking first-layer banner on first visit).
  - **`ca`** (default if unset) — **US + CA** subdivision → opt-in banner + blocked third parties until consent; other US states → opt-out.
  - **`all`** — entire US → opt-in banner + blocking. Changing this env var in Vercel requires a **redeploy** for the new `NEXT_PUBLIC_*` value to reach the browser bundle.
  - **UX note:** `geoLabel` stays **`us`** for preference-center copy (“Your Privacy Choices”) even for California.
- **US / rest of world (opt-out where not in US opt-in):** No blocking banner on first visit. **Your Privacy Choices** (footer + floating control) opens the preference center. Defaults allow non-essential until the user opts out or **Global Privacy Control** is on.
- **GPC:** If `navigator.globalPrivacyControl` is true, analytics/marketing/functional are denied, a confirmation line is shown, and consent is logged.

## Debug geo locally

Middleware reads `?debug-region=` and sets both a short-lived cookie and the **`x-fsds-consent-debug`** request header so `getGeoContext()` resolves correctly on the same request (no cookie timing issues).

- `?debug-region=eu` — EU opt-in behavior
- `?debug-region=us` — US opt-out behavior (unless `NEXT_PUBLIC_CONSENT_US_OPT_IN` forces US-wide opt-in)
- `?debug-region=us-ca` — US + California subdivision (`x-fsds-consent-debug-region`), for testing `ca` mode (default)
- `?debug-region=clear` — remove override

## Audit trail

`POST /api/consent/log` writes a `consentLog` document in Sanity when `SANITY_API_TOKEN` is set (otherwise the route returns `{ ok: true, skipped: true }`). Schema: [`sanity/schemaTypes/consentLog.ts`](../sanity/schemaTypes/consentLog.ts).

## Validation

```bash
bun run dev   # terminal 1
bun run consent-compliance   # terminal 2, hits http://localhost:3000 by default
```

Uses the `playwright` package directly (`scripts/consent-compliance.playwright.ts`), not `@playwright/test`.

## Bump policy / banner versions

- Set `NEXT_PUBLIC_PRIVACY_POLICY_VERSION` (e.g. `2026-04`) when legal copy changes.
- Bump `NEXT_PUBLIC_CONSENT_VERSION` in env to re-prompt users after material CMP changes.
