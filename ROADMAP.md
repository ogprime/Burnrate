# Roadmap

## Android Release

### Setup
- [ ] Install [Android Studio](https://developer.android.com/studio) (includes Android SDK + AVD emulator)

### Build
- [ ] Run `npm run cap:android` — opens project in Android Studio
- [ ] Wait for Gradle sync to complete (first run takes a few minutes)
- [ ] Test on emulator or physical device

### Sign & Release
- [ ] Build → Generate Signed Bundle → **Android App Bundle (.aab)**
- [ ] Create a keystore (`.jks`) — **back it up, losing it = can never update the app**
- [ ] Enable Play App Signing on first upload (Google manages distribution key)

### Google Play Store Submission
- [ ] Create app listing at [play.google.com/console](https://play.google.com/console)
- [ ] Upload `.aab`
- [ ] Add store metadata:
  - Short description (80 chars max)
  - Full description
  - 2+ phone screenshots
  - Feature graphic (1024×500 PNG)
- [ ] Host privacy policy publicly (e.g. GitHub Pages) and link it
- [ ] Complete content rating questionnaire (answer: "Everyone")
- [ ] Submit for review (~1–3 days)

---

## iOS Release

### Prerequisites
- [ ] Access to a Mac (friend, family, coworker) with Xcode installed — Xcode is macOS-only, no workaround on Windows
- [ ] Apple Developer Program membership ($99/yr) at [developer.apple.com](https://developer.apple.com)

### Setup (run on the Mac)
The repo is already configured — whoever has the Mac just needs to clone and run:

```bash
git clone https://github.com/ogprime/Burnrate.git
cd Burnrate
npm i
npx cap add ios
npx @capacitor/assets generate --ios --iconBackgroundColor '#0a0a0f' --iconBackgroundColorDark '#0a0a0f' --splashBackgroundColor '#0a0a0f' --splashBackgroundColorDark '#0a0a0f'
npx cap sync ios
npm run cap:ios
```

### Build & Sign
- [ ] In Xcode: set Bundle Identifier to `com.burnrate.app`
- [ ] Set signing team and provisioning profile (tied to your Apple Developer account, not the Mac)
- [ ] Product → Archive → Distribute App → App Store Connect

### App Store Submission
- [ ] Create app listing at [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- [ ] Upload build via Xcode or Transporter
- [ ] Add store metadata:
  - Screenshots for 6.7" iPhone (required)
  - Privacy policy URL
  - Keywords (100 chars, comma-separated)
- [ ] Complete age rating questionnaire
- [ ] Submit for review (~24–48 hrs)

---

## Future Enhancements

- [ ] **Image sharing on native** — add `@capacitor/filesystem` to write the receipt PNG to a temp file and pass the native URI to `@capacitor/share` (currently shares text-only on native)
- [ ] **Migrate localStorage to `@capacitor/preferences`** — more reliable on iOS where WebView storage can be cleared by the OS under memory pressure
