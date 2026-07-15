# Asset Folder Structure

This folder contains all local images and assets for Ayodhya Estate.

## Folder Organization

### `/hero/`
Place your main hero section images here:
- Lord Ram and Sita banner
- Divine backgrounds
- Hero overlay images

Example filename: `lord-rama-sita.jpg`

### `/site/`
Place site-specific photos here:
- Construction progress
- Land development photos
- Infrastructure images
- Site entry gates
- Signboards

## Usage in Components

To use these images in your React components:

```javascript
// In Hero.jsx, update the CSS background:
background: url('/assets/hero/lord-rama-sita.jpg') center/cover no-repeat;
```

## Supported Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- SVG (.svg)

## Recommendations

1. **Optimize images** before adding them:
   - Hero images: Max 1920x1080px
   - Gallery images: Max 1200x800px
   
2. **Use descriptive filenames**:
   - `ram-mandir-view.jpg`
   - `saryu-ghat-sunset.jpg`
   - `plot-entrance-gate.jpg`

3. **Keep file sizes reasonable**:
   - Hero images: < 500KB
   - Regular images: < 300KB

## Note

The gallery images on the public site are **NOT** pulled from this folder. They come from the admin panel uploads (Cloudinary). This folder is ONLY for:
- Hero background
- Any hardcoded design elements
- Static branding images
