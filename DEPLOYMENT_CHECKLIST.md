# PWA Deployment Checklist ✅

Use this checklist before deploying to app stores.

## Pre-Deployment

- [ ] Run dev server: `npm run dev`
- [ ] Visit `http://localhost:5173/?generator=true`
- [ ] Click "Generate All PWA Assets"
- [ ] Download all 5 PNG files:
  - [ ] icon-192.png
  - [ ] icon-512.png
  - [ ] screenshot-setup.png
  - [ ] screenshot-timer.png
  - [ ] screenshot-receipt.png
- [ ] Move all PNG files to `/public` folder
- [ ] Delete temp SVG files:
  - [ ] /public/icon-192-temp.svg
  - [ ] /public/icon-512-temp.svg

## Testing

- [ ] Run `npm run build` successfully
- [ ] Test on localhost
- [ ] Test in mobile browser (Chrome/Safari)
- [ ] Test "Add to Home Screen"
- [ ] Test offline mode (disconnect network)
- [ ] Test app icon appears correctly
- [ ] Test all features work in standalone mode

## Deployment

- [ ] Push code to repository
- [ ] Deploy to hosting service:
  - Option 1: Vercel (recommended)
  - Option 2: Netlify
  - Option 3: GitHub Pages
  - Option 4: Your choice
- [ ] Verify HTTPS is working
- [ ] Visit deployed URL in Chrome
- [ ] Open DevTools > Application tab
- [ ] Check "Manifest" section loads correctly
- [ ] Check "Service Workers" is registered
- [ ] Test install prompt on desktop
- [ ] Test "Add to Home Screen" on mobile

## PWABuilder Packaging

- [ ] Visit https://www.pwabuilder.com/
- [ ] Enter your deployed HTTPS URL
- [ ] Wait for PWA analysis
- [ ] Review manifest preview
- [ ] Check all icons load
- [ ] Click "Package For Stores"
- [ ] Generate Android package (.apk or .aab)
- [ ] Generate iOS package (if needed)
- [ ] Download packages

## App Store Preparation

### Google Play Store
- [ ] Create Google Play Developer account ($25)
- [ ] Prepare app listing:
  - [ ] App name: "Burn Rate"
  - [ ] Short description (80 chars)
  - [ ] Full description
  - [ ] Screenshots (already generated!)
  - [ ] Feature graphic
  - [ ] App category: Productivity / Business
  - [ ] Content rating questionnaire
- [ ] Privacy policy URL
- [ ] Upload .aab or .apk file
- [ ] Submit for review

### Apple App Store
- [ ] Create Apple Developer account ($99/year)
- [ ] Install Xcode on Mac
- [ ] Prepare app listing:
  - [ ] App name: "Burn Rate"
  - [ ] Subtitle
  - [ ] Description
  - [ ] Screenshots (already generated!)
  - [ ] Keywords
  - [ ] App category: Productivity / Business
  - [ ] Age rating
- [ ] Privacy policy URL
- [ ] Create app in App Store Connect
- [ ] Upload build from PWABuilder
- [ ] Submit for review

## Legal Requirements

- [ ] Create Privacy Policy
- [ ] Create Terms of Service (optional)
- [ ] Host legal pages on your domain
- [ ] Link to legal pages in manifest (optional)

## Post-Launch

- [ ] Monitor app store reviews
- [ ] Track installation metrics
- [ ] Update app regularly
- [ ] Respond to user feedback
- [ ] Update screenshots when UI changes

---

**Current Status**: Assets pending generation
**Next Action**: Run generator at `?generator=true`
