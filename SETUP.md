# CMOS Listening Test — Setup Guide

## 1. Add Your Audio Files

Place your model outputs in:
```
audio/model_a/   ← Baseline model (real data only)
audio/model_b/   ← Augmented model (real + synthetic)
```

Both models should generate speech for the same sentences. Name files identically across folders (e.g., `arctic_a0001.wav` in both).

## 2. Update Trial Config

Edit the `CONFIG.trials` array in `index.html` to match your audio files:

```js
trials: [
  {
    id: "arctic_a0001",
    transcript: "Author of the danger trail...",
    audioA: "audio/model_a/arctic_a0001.wav",
    audioB: "audio/model_b/arctic_a0001.wav"
  },
  // ... more trials
]
```

Use 15-20 trials for a reliable CMOS score.

## 3. Set Up Google Sheets (for saving results)

1. Create a new Google Sheet
2. Go to **Extensions > Apps Script**
3. Paste the contents of `google_apps_script.js` into `Code.gs`
4. Click **Deploy > New deployment**
5. Type: **Web app**
6. Execute as: **Me**
7. Who has access: **Anyone**
8. Click **Deploy**, authorize, and copy the URL
9. Paste the URL into `CONFIG.googleScriptUrl` in `index.html`:

```js
googleScriptUrl: "https://script.google.com/macros/s/YOUR_ID/exec",
```

If you skip this step, results will download as CSV files instead.

## 4. Deploy to GitHub Pages

```bash
# Create a new repo on GitHub, then:
cd cmos-test
git init
git add .
git commit -m "Add CMOS listening test"
git remote add origin https://github.com/YOUR_USERNAME/cmos-test.git
git push -u origin main
```

Then on GitHub:
1. Go to repo **Settings > Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click **Save**

Your test will be live at: `https://YOUR_USERNAME.github.io/cmos-test/`

## 5. Share with Listeners

Send the GitHub Pages URL to your evaluators. Each listener:
- Opens the link in Chrome (recommended)
- Uses headphones
- Rates all audio pairs
- Results auto-save to your Google Sheet (or download as CSV)

## 6. Analyze Results

CMOS score = mean of all ratings across listeners.
- Positive mean → Model A (baseline) is better
- Negative mean → Model B (augmented) is better
- |CMOS| > 1.0 is generally considered a significant difference

## Audio Format Notes

- Use WAV or MP3 (WAV recommended for quality)
- All files should have the same sample rate and loudness
- Keep files under 5 MB each for fast loading on GitHub Pages
- GitHub Pages has a 1 GB repo size limit — if you have many files, consider using MP3
