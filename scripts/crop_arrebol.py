import os
from PIL import Image

src_path = '/Users/felipeandresvivancocornejo/.gemini/antigravity/brain/e03abb34-78a0-4a1e-aec4-2be226463fba/.user_uploaded/media_1793482667820_3ae77253.png'
out_dir = '/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/public/images/real/facebook'

im = Image.open(src_path)
print(f"Source size: {im.size}") # (1024, 661)

# In media_1793482667820_3ae77253.png:
# Facebook post column is roughly x from 450 to 865
# The image collage of Arrebol is from x=450 to 865, y=230 to 660
# Let's crop the main Arrebol branding square (top left)
arrebol_logo = im.crop((450, 230, 648, 520))
arrebol_logo.save(os.path.join(out_dir, 'fb-arrebol-logo.webp'), 'WEBP', quality=95)

# Architecture exterior (top right)
arrebol_arch = im.crop((650, 230, 864, 520))
arrebol_arch.save(os.path.join(out_dir, 'fb-arrebol-arch.webp'), 'WEBP', quality=95)

# Room tags (bottom)
arrebol_tags = im.crop((598, 535, 843, 660))
arrebol_tags.save(os.path.join(out_dir, 'fb-arrebol-tags.webp'), 'WEBP', quality=95)

# Combined full Arrebol collage
arrebol_full = im.crop((450, 230, 864, 520))
arrebol_full.save(os.path.join(out_dir, 'fb-arrebol-hero.webp'), 'WEBP', quality=95)

print("Arrebol assets saved!")
