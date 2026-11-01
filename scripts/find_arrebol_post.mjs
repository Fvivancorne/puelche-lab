import fs from 'fs';

const wsUrl = "ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C";
const ws = new WebSocket(wsUrl);

function sendCommand(method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === id) {
        ws.removeEventListener("message", handler);
        resolve(data.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.onopen = async () => {
  console.log("Searching for Arrebol post in timeline...");
  for (let i = 0; i < 30; i++) {
    const res = await sendCommand("Runtime.evaluate", {
      expression: `(() => {
        window.scrollBy(0, 1800);
        // Find text matching Arrebol or Veliche
        const all = Array.from(document.querySelectorAll("span, div, p"));
        const match = all.find(el => el.children.length === 0 && el.textContent && el.textContent.includes("Hotel Arrebol"));
        if (match) {
          match.scrollIntoView({ behavior: "instant", block: "center" });
          let container = match;
          for (let k = 0; k < 10; k++) {
            if (container && container.querySelectorAll) {
              const imgs = container.querySelectorAll("img[src*='scontent'], img[src*='fbcdn']");
              if (imgs.length >= 2) break;
            }
            if (container.parentElement) container = container.parentElement;
          }
          const imgs = Array.from(container.querySelectorAll("img[src*='scontent'], img[src*='fbcdn']"))
            .map(img => ({ src: img.src, w: img.naturalWidth, h: img.naturalHeight, alt: img.alt }));
          const links = Array.from(container.querySelectorAll("a[href*='photo']")).map(a => a.href);
          return { found: true, text: match.textContent, imgs, links };
        }
        return { found: false, scrollY: window.scrollY };
      })()`,
      returnByValue: true
    });
    const val = res?.result?.value;
    if (val?.found) {
      console.log("FOUND ARREBOL POST!", JSON.stringify(val, null, 2));
      fs.writeFileSync('./scripts/arrebol_data.json', JSON.stringify(val, null, 2));
      break;
    } else {
      console.log(`Scroll ${i + 1}: not found yet (scrollY: ${val?.scrollY})`);
    }
    await new Promise(r => setTimeout(r, 1200));
  }
  ws.close();
};
