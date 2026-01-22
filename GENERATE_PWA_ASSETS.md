# Quick Start: Generate PWA Assets

## Step 1: Run the Generator

Add `?generator=true` to your app URL:

**Local Development:**
```
http://localhost:5173/?generator=true
```

**Or whatever port Vite is running on.**

## Step 2: Generate Assets

1. You'll see the PWA Assets Generator page
2. Click the big green button: **"Generate All PWA Assets"**
3. Wait for all 5 files to download:
   - icon-192.png
   - icon-512.png
   - screenshot-setup.png
   - screenshot-timer.png
   - screenshot-receipt.png

## Step 3: Install Assets

1. Move all 5 downloaded PNG files into `/public` folder
2. Delete these temp files from `/public`:
   - icon-192-temp.svg
   - icon-512-temp.svg

## Step 4: Done!

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
