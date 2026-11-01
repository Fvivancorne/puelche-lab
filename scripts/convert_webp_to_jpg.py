import os
from PIL import Image

dir_path = '/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/public/images/real/facebook'

for f in os.listdir(dir_path):
    if f.endswith('.webp'):
        base = f[:-5]
        src = os.path.join(dir_path, f)
        dest = os.path.join(dir_path, base + '.jpg')
        im = Image.open(src).convert('RGB')
        im.save(dest, 'JPEG', quality=92)
        print(f"Converted {f} -> {base}.jpg ({os.path.getsize(dest)} bytes)")

print("All webp converted to jpg!")
