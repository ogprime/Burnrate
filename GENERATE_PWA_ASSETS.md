# Quick Start: Generate PWA Assets with Free Online Tools

## Step 1: Convert Icon SVGs to PNGs

### Option A: CloudConvert (Recommended)
1. Visit: https://cloudconvert.com/svg-to-png
2. Upload `/public/icon-192-temp.svg`
3. Click "Convert"
4. Download as `icon-192.png`
5. Repeat for `/public/icon-512-temp.svg` → `icon-512.png`

### Option B: Other Free Tools
- https://convertio.co/svg-png/
- https://www.zamzar.com/convert/svg-to-png/
- https://www.aconvert.com/image/svg-to-png/

**Result:** You'll have `icon-192.png` and `icon-512.png`

## Step 2: Take App Screenshots

### Option A: From Your Phone (Most Authentic)
1. Deploy your app or access it on your phone
2. Navigate to each screen:
   - Setup screen
   - Timer screen (let it run for a bit)
   - Receipt screen
3. Take screenshots
4. Transfer to computer
5. Rename:
   - `screenshot-setup.png`
   - `screenshot-timer.png`
   - `screenshot-receipt.png`

### Option B: Browser DevTools
1. Open your app in Chrome
2. Press F12 (open DevTools)
3. Click device toolbar icon (or Ctrl+Shift+M)
4. Select device: iPhone 12 Pro (390 x 844)
5. Navigate to each screen
6. Click the screenshot icon (⋮ menu → Capture screenshot)
7. Save with proper names

### Option C: Online Screenshot Tools
- https://www.screely.com/ (add device frame)
- https://screenshots.cloud/
- Your browser's built-in screenshot tool

**Result:** You'll have 3 screenshot PNG files

## Step 3: Install Assets

1. Move all 5 PNG files into `/public` folder:
   - icon-192.png
   - icon-512.png
   - screenshot-setup.png
   - screenshot-timer.png
   - screenshot-receipt.png

2. Delete these temp files from `/public`:
   - icon-192-temp.svg
   - icon-512-temp.svg

## Step 4: Verify

Visit: **http://localhost:5173/icon-preview.html** (if running locally)

All icons should show ✅ Ready status

## Step 5: Done!

Your PWA is complete and ready to deploy! 🎉

## What These Files Do

- **icon-192.png**: Small app icon (Android home screen, shortcuts)
- **icon-512.png**: Large app icon (splash screens, app drawer)
- **screenshot-*.png**: App Store/Play Store preview images

## Next Steps

1. Deploy your app to a hosting service (Vercel, Netlify, etc.)
2. Visit https://www.pwabuilder.com/
3. Enter your deployed URL
4. Generate packages for iOS/Android
5. Submit to app stores!

---

See `/PWA_COMPLETE.md` for detailed documentation.
