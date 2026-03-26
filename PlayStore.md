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
- **Short description** (80 chars max): e.g. `Real-time meeting cost calculator. Because meetings aren't free.`
- **Full description** (4000 chars max): explain the app, its features, the vibe

**Graphics — required:**
| Asset | Size | Notes |
|-------|------|-------|
| App icon | 512×512 PNG | No transparency |
| Feature graphic | 1024×500 PNG | Banner shown at top of listing |
| Phone screenshots | At least 2 | Minimum 320px on shortest side |

> For screenshots: use the Android Studio emulator to take screenshots of the app running (camera icon in the emulator toolbar).

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
