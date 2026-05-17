# RetirementPlanner — Deployment Package

## Files in this package

### HTML App Files
- `index.html` — Main landing page + all app routing
- `Financial-planning.html` — US wealth building tool
- `Financial-planning-India.html` — India wealth building tool
- `Retirement_Plan.html` — US retirement income tool
- `Retirement-Plan-India.html` — India retirement income tool
- `Retire-In-India.html` — Cross-border US→India tool
- `pricing.html` — Pricing page

### PWA Assets (place in same folder as index.html)
- `manifest.json` — Web App Manifest (PWA install metadata)
- `service-worker.js` — Offline caching service worker
- `logo-512.svg` — Primary app icon (512×512)
- `logo-192.svg` — App icon (192×192)
- `logo-maskable-512.svg` — Maskable icon for Android adaptive icons
- `logo-180.svg` — Apple Touch icon (180×180)
- `favicon-32.svg` — Browser tab favicon (32×32)
- `favicon-16.svg` — Small favicon (16×16)
- `favicon.svg` — Generic favicon alias
- `og-image.svg` — Open Graph / social preview image (1200×630)
- `browserconfig.xml` — Windows tile configuration

## Deployment Options

### Option A: Single file (no server)
Open `index.html` directly in your browser.
The PWA will self-install using inline Blob manifests already
embedded in the HTML — no server needed. Works on file://

### Option B: Static web host (recommended for full PWA)
Drop ALL files into the same folder on any static host:
- GitHub Pages, Netlify, Vercel, Cloudflare Pages (all free)
- Any web server (nginx, Apache)

The `manifest.json` + `service-worker.js` will be served properly,
enabling full PWA install on all platforms including iOS.

### Adding to Home Screen

**iPhone / iPad (Safari):**
1. Open the URL in Safari
2. Tap Share button (⎋)
3. Tap "Add to Home Screen"
4. Tap "Add"

**Android (Chrome):**
1. Open the URL in Chrome
2. Wait for the install banner (appears after ~3 sec)
3. Tap "Install"
— OR —
Tap ⋮ menu → "Add to Home Screen"

**Desktop (Chrome / Edge):**
1. Look for the install icon in the address bar
2. Click it and confirm

## Add to manifest.json <head> link
If serving from a web server, add this to each HTML file's <head>:
```html
<link rel="manifest" href="manifest.json">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="apple-touch-icon" href="logo-180.svg">
```
(Already embedded inline in all HTML files for file:// use)
