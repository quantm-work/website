# Consent implementation summary

## What changed

- **Geo:** `getGeoContext()` + `middleware` (`?debug-region=`, `x-fsds-consent-debug`, optional `x-fsds-consent-debug-region`, cookie). EU/EEA/UK/CH → opt-in banner. US: opt-out by default, or **`NEXT_PUBLIC_CONSENT_US_OPT_IN`** (`off` | `ca` default | `all`) to require opt-in + blocking for CA or all US; US/rest otherwise → opt-out defaults + **Your Privacy Choices** (footer link + floating control).
- **UI:** `ConsentBanner` — Customize / Reject All / Accept All (equal primary buttons), `/privacy-policy` + `/cookies` links, `section` landmark, detail toggles (strictly necessary / functional / analytics / marketing).
- **State:** `consent-store` — `functional`, `source`, `region`, 180-day TTL, `NEXT_PUBLIC_CONSENT_VERSION` default **2.0.0**, GPC detection, opt-out effective defaults via `consent-effective.ts`.
- **Scripts:** `root-analytics.tsx` — GTM Consent Mode v2 `consent_default` / `consent_update`, gates GTM/GA4/HubSpot/Warmly/Clay; Vercel Analytics always on; removed `analytics-provider.tsx`; Clay moved from `layout` to `ClayAnalytics`.
- **Shell:** `GeoConsentRoot` + `Suspense` for async geo (Next cache components).
- **Audit:** `POST /api/consent/log` → Sanity `consentLog` (when `SANITY_API_TOKEN` set).
- **Tests:** `bun run consent-compliance` (Playwright library, not Test).

## Compliance mapping (engineering, not legal advice)

- **GDPR/ePrivacy:** Prior consent for non-essential categories in opt-in regions; symmetric reject/accept; withdrawal via persistent controls; logging for accountability.
- **CCPA/CPRA:** Opt-out defaults where applicable; GPC honored; “Your Privacy Choices” entry point; confirmation after GPC.

## How to test

```bash
bun run dev
BASE_URL=http://localhost:3000 bun run consent-compliance
```

## Follow-ups

- Hosted Studio: run `bunx sanity deploy` after push (schema adds `consentLog`).
- Set `NEXT_PUBLIC_PRIVACY_POLICY_VERSION` / bump `NEXT_PUBLIC_CONSENT_VERSION` when legal or CMP text changes materially.
