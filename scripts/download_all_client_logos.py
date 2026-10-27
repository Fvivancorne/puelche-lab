import urllib.request
import os

OUT_DIR = "/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/public/images/real/clients"
os.makedirs(OUT_DIR, exist_ok=True)

for i in range(1, 21):
    filename = f"cliente{i}-1.png"
    url = f"https://www.puelchelab.cl/wp-content/uploads/2024/05/cliente{i}-1.png"
    dest = os.path.join(OUT_DIR, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            with open(dest, 'wb') as f:
                f.write(resp.read())
        print(f"Downloaded {filename} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {filename}: {e}")
