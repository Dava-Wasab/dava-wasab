#!/usr/bin/env python3
"""Generate gallery HTML from images in folders - Auto-updates on new images"""
import os
from pathlib import Path
import time
from urllib.parse import quote

# Gallery folders
galleries = {
    'skins': 'Skin Gallery',
    'models': 'Model Gallery',
    'pixelart': 'PixelArt Gallery',
    'renders': 'Render Gallery'
}

# Read current HTML
with open('../index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the gallery section
start_marker = '<!-- Skin Gallery -->'
end_marker = '<!-- Model Gallery -->'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Error: Could not find gallery section")
    exit(1)

# Generate HTML for each gallery
gallery_html = ''

for gallery_id, folder_name in galleries.items():
    folder_path = Path('..') / 'media' / folder_name
    
    # Get all image files
    images = []
    if folder_path.exists():
        for ext in ['*.png', '*.jpg', '*.jpeg', '*.gif']:
            images.extend(folder_path.glob(ext))
    
    # Generate gallery container
    active_class = ' active' if gallery_id == 'skins' else ''
    gallery_html += f'\n            <!-- {folder_name} -->\n'
    gallery_html += f'            <div class="gallery-container{active_class}" id="gallery-{gallery_id}">\n'
    gallery_html += f'                <div class="skins-grid">\n'
    
    if images:
        for img in sorted(images):
            # Fix path to be relative from root (remove ../)
            img_path = str(img).replace('\\', '/').replace('../', '')
            # URL-encode the path to handle spaces and special characters
            img_path_encoded = quote(img_path)
            gallery_html += f'                    <div class="skin-card">\n'
            gallery_html += f'                        <div class="skin-image-wrapper">\n'
            gallery_html += f'                            <img src="{img_path_encoded}" alt="{folder_name}" class="skin-image" loading="lazy">\n'
            gallery_html += f'                        </div>\n'
            gallery_html += f'                    </div>\n\n'
    else:
        gallery_html += f'                    <div class="skin-card">\n'
        gallery_html += f'                        <div class="skin-image-wrapper">\n'
        gallery_html += f'                            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-white); text-align: center; padding: 20px;">\n'
        gallery_html += f'                                <p>Add your images to<br><strong>media/{folder_name}/</strong></p>\n'
        gallery_html += f'                            </div>\n'
        gallery_html += f'                        </div>\n'
        gallery_html += f'                    </div>\n'
    
    gallery_html += f'                </div>\n'
    gallery_html += f'            </div>\n'

# Find where to insert
insert_start = content.find(start_marker)
insert_end = content.find('        </div>\n    </section>\n\n    <!-- Models Section -->')

if insert_start != -1 and insert_end != -1:
    new_content = content[:insert_start] + gallery_html + content[insert_end:]
    
    with open('../index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Generated galleries:")
    for gallery_id, folder_name in galleries.items():
        folder_path = Path('..') / 'media' / folder_name
        count = len(list(folder_path.glob('*.png'))) + len(list(folder_path.glob('*.jpg')))
        print(f"  - {folder_name}: {count} images")
else:
    print("Error: Could not find insertion points")
