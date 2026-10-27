import urllib.request
import re
from bs4 import BeautifulSoup
import os

url = "https://www.puelchelab.cl/nuestros-clientes/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
soup = BeautifulSoup(html, 'html.parser')

OUT_DIR = "/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/public/images/real/clients"
os.makedirs(OUT_DIR, exist_ok=True)

print("Finding client logos...")
imgs = soup.find_all('img')
count = 0
for img in imgs:
    src = img.get('src') or img.get('data-opt-src')
    if src and ('cliente' in src.lower() or 'logo' in src.lower() or '2018' in src):
        # clean optimole
        m = re.search(r'(https://www\.puelchelab\.cl/wp-content/[^\s"\'<>]+)', src)
        clean_src = m.group(1) if m else src
        filename = os.path.basename(clean_src.split('?')[0])
        dest = os.path.join(OUT_DIR, filename)
        try:
            r = urllib.request.Request(clean_src, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(r, timeout=10) as resp:
                with open(dest, 'wb') as f:
                    f.write(resp.read())
            print(f"Downloaded client logo: {filename}")
            count += 1
        except Exception as e:
            print(f"Failed {filename}: {e}")

print(f"Total client logos downloaded: {count}")
