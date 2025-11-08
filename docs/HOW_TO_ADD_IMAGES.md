# How to Add New Images to Portfolio

## Quick Guide

### 1. Add Your Images
Place your images in the appropriate folder:
- `media/Skin Gallery/` - for Minecraft skins
- `media/Model Gallery/` - for 3D models
- `media/PixelArt Gallery/` - for pixel art
- `media/Render Gallery/` - for renders

### 2. Update the Gallery
Run this command in the terminal:
```bash
python generate_galleries.py
```

### 3. Refresh Your Browser
Press `Ctrl+F5` (or `Cmd+Shift+R` on Mac) to hard refresh and see your new images!

## Supported Image Formats
- PNG (.png)
- JPG/JPEG (.jpg, .jpeg)
- GIF (.gif)

## Notes
- Images will automatically appear in the correct gallery
- The script preserves all your existing images
- Transparent images in Render Gallery will have a checkered background
- All images are protected from copying and dragging

## Troubleshooting
If images don't appear:
1. Make sure the image is in the correct folder
2. Check that the file extension is .png, .jpg, or .jpeg
3. Run `python generate_galleries.py` again
4. Hard refresh your browser (Ctrl+F5)
