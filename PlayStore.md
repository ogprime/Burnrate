# Google Play Store Launch Guide

## What You'll Need
- Android Studio installed ([download here](https://developer.android.com/studio))
- A Google account
- $25 one-time Google Play Developer registration fee
- A publicly hosted privacy policy URL

---

## Step 1: Install Android Studio

1. Download and install [Android Studio](https://developer.android.com/studio)
2. During setup, accept all defaults — it will install the Android SDK automatically
3. Let the initial setup wizard complete (it downloads several GB of tools)

---

## Step 2: Open the Project

1. Run `npm run cap:android` from the project root
2. Android Studio will open with the project loaded
3. You'll see a "Gradle sync" notification at the bottom — wait for it to finish (can take 5–10 minutes on first run)
4. When sync is done, the project tree on the left will show `app` and other modules

---

## Step 3: Test the App

**On an emulator:**
1. Click **Device Manager** in the right sidebar
2. Click **Create Device** → choose a Pixel model → select a recent Android version (API 34+) → Finish
3. Click the green ▶ Play button in the toolbar to build and launch

**On a physical Android phone:**
1. On your phone: Settings → About Phone → tap **Build Number** 7 times to enable Developer Options
2. Settings → Developer Options → enable **USB Debugging**
3. Plug phone into your PC via USB and allow the connection
4. Your phone will appear in the device dropdown in Android Studio — select it and hit ▶

---

## Step 4: Create a Keystore (Signing Key)

This is a one-time step. The keystore is what proves you are the developer — **losing it means you can never publish an update to the app.** Back it up to Google Drive, iCloud, or a password manager.

1. In Android Studio: **Build → Generate Signed Bundle / APK**
2. Select **Android App Bundle** → click Next
3. Click **Create new...**
4. Fill in the form:
   - **Key store path** — save it somewhere safe (e.g. `C:\Users\YourName\burnrate.jks`)
   - **Password** — pick a strong password, save it in your password manager
   - **Key alias** — e.g. `burnrate`
   - **Key password** — can be the same as above
   - **Validity** — leave at 25 years
   - **Certificate fields** — First and Last Name is enough, rest are optional
5. Click OK

---

## Step 5: Build the Release Bundle

Continuing from Step 4:

1. Make sure your new keystore is selected
2. Enter your passwords
3. Select **release** build variant
4. Click **Finish**
5. Android Studio will build the `.aab` file — when done, it shows a notification with a link to the output folder
6. The file will be at: `android/app/release/app-release.aab`

---

## Step 6: Register as a Google Play Developer

1. Go to [play.google.com/console](https://play.google.com/console)
2. Sign in with your Google account
3. Pay the **$25 one-time registration fee**
4. Fill in your developer profile (name, email, etc.)
5. Account verification takes up to 48 hours

---

## Step 7: Create the App Listing

1. In Play Console: click **Create app**
2. Fill in:
   - **App name:** Burn Rate
   - **Default language:** English
   - **App or game:** App
   - **Free or paid:** Free
3. Accept the declarations and click **Create app**

---

## Step 8: Complete the Store Listing

In the left sidebar: **Grow → Store presence → Main store listing**

**App details:**

- **Short description** (80 chars max):
  ```
  Watch the meeting cost climb in real time. Then get the receipt.
  ```
  (66 chars — alternates: `Real-time meeting cost calculator. Because meetings aren't free.` / `A live burn counter for every meeting you sit through.`)

- **Full description** (4000 chars max):
  ```
  Every meeting has a price tag. Burn Rate shows it to you — live.

  Set your attendee count and pick a "vibe" (Individual, Manager, Senior, C-Suite —
  each with its own hourly rate), hit Ignite, and watch the dollar counter climb in
  real time for as long as the meeting drags on.

  When it's finally over, you get an official receipt: total cost, duration,
  attendee count, and a snarky one-liner to match the damage — "Could have been an
  email," "ROI not found," "That's a lot of lattes." Share it, screenshot it, or
  just sit with it.

  FEATURES
  • Live cost counter, updating every second
  • Vibe slider — quick presets from individual contributor to C-suite hourly rates
  • Custom attendee count and hourly rate
  • Shareable receipts with rotating snarky commentary
  • Meeting history, saved locally
  • Haptic buzz at cost milestones so you feel the burn
  • Works fully offline — no account, no ads, no tracking

  Burn Rate doesn't collect or transmit any data. Everything — your settings,
  your meeting history — stays on your device. See the privacy policy for details.

  Built for anyone who's ever sat in a meeting doing the math in their head.
  Now the app does it for you. In real time. Out loud.
  ```

- **Category:** Productivity
- **Tags:** productivity, business, calculator, meetings, time tracking

**Graphics — required:**
| Asset | Size | Notes |
|-------|------|-------|
| App icon | 512×512 PNG | No transparency |
| Feature graphic | 1024×500 PNG | Banner shown at top of listing |
| Phone screenshots | At least 2 | Long side ≤ 2× short side, or Play Console rejects the upload |

> Ready-to-upload files are in `store-assets/`: `icon-512.png`, `feature-graphic-1024x500.png`,
> and three padded screenshots (`ReceiptView-padded.png`, `SetupView-padded.png`,
> `calculating-padded.png`). These were generated from the originals at the repo root, which
> didn't meet Play's exact-size / aspect-ratio rules. The padded screenshots have some black
> margin — fine to ship as-is, or swap in fresh raw screenshots from the emulator later
> (camera icon in the emulator toolbar) for a tighter look, since those won't need padding.

---

## Step 9: Fill In Required Sections

Work through each section in the left sidebar — they'll show a ✓ when complete.

**App content (Policy → App content):**
- **Privacy policy** — paste your public URL (host `public/privacy-policy.html` on GitHub Pages or similar)
- **Ads** — select "No ads"
- **Content rating** — click Start questionnaire → answer honestly → the app will be rated **Everyone**
- **Target audience** — select 18+ (the snarky copy skews adult)
- **Data safety** — declare what data you collect:
  - No data collected from users (history is stored locally only)

**Store settings:**
- **App category:** Tools or Productivity
- **Tags:** add relevant tags like "productivity", "business", "calculator"

---

## Step 10: Set Up Pricing & Distribution

Left sidebar: **Monetize → Pricing & distribution** (or similar — Play Console layout shifts occasionally)

- Select **Free**
- Select countries to distribute in (easiest: select all)

---

## Step 11: Upload the Build

Left sidebar: **Release → Production → Create new release**

1. Click **Upload** and select your `app-release.aab`
2. When prompted about **Play App Signing** — click **Continue**. Google will manage the final signing key used for distribution. This is the right call.
3. Add release notes (e.g. "Initial release")
4. Click **Save** then **Review release**

---

## Step 12: Submit for Review

1. Fix any warnings shown on the review screen (they'll tell you exactly what's missing)
2. Click **Start rollout to Production**
3. Confirm

Google will review the app — typically **1–3 days** for a new app. You'll get an email when it's approved or if they need changes.

---

## After Launch

**To push an update:**
1. Make your code changes
2. Run `npm run cap:sync` to rebuild and sync
3. Bump the version code in `android/app/build.gradle` (increment `versionCode` by 1)
4. Rebuild the signed `.aab` (Step 5)
5. In Play Console: Release → Production → Create new release → upload new `.aab`
