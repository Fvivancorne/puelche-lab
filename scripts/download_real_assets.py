import urllib.request
import os

OUT_DIR = "/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/public/images/real"
os.makedirs(OUT_DIR, exist_ok=True)

ASSETS = [
    ("logo-top.png", "https://mlj4vapaxyc9.i.optimole.com/w:400/h:120/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2018/06/logo-top.png"),
    ("logo-puelche.png", "https://mlj4vapaxyc9.i.optimole.com/w:412/h:282/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/10/logo-puelche.png"),
    ("bg-agencia.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/10/bg-agencia.jpg"),
    ("bg-home-2.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/10/bg-home-2.jpg"),
    ("bg-portafolios-fotografia-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-min.jpg"),
    ("bg-portafolios-fotografia-a-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-a-min.jpg"),
    ("bg-portafolios-fotografia-b-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-b-min.jpg"),
    ("bg-portafolios-fotografia-c-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-c-min.jpg"),
    ("bg-portafolios-fotografia-d-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-d-min.jpg"),
    ("bg-portafolios-fotografia-f-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-f-min.jpg"),
    ("bg-portafolios-fotografia-g-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-g-min.jpg"),
    ("bg-portafolios-fotografia-h-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-h-min.jpg"),
    ("bg-portafolios-fotografia-i-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2021/12/bg-portafolios-fotografia-i-min.jpg"),
    ("bg-fotografia-6-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2024/05/bg-fotografia-6-min.jpg"),
    ("bg-fotografia-9-min.jpg", "https://mlj4vapaxyc9.i.optimole.com/w:1920/h:1010/q:mauto/f:best/https://www.puelchelab.cl/wp-content/uploads/2024/05/bg-fotografia-9-min.jpg"),
]

for filename, url in ASSETS:
    dest = os.path.join(OUT_DIR, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            with open(dest, "wb") as f:
                f.write(resp.read())
        print(f"Downloaded: {filename} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {filename}: {e}")
