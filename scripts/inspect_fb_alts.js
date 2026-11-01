const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        const imgs = Array.from(document.querySelectorAll('img[src*="scontent"], img[src*="fbcdn"]'));
        const seen = new Set();
        const results = [];
        for (const img of imgs) {
          if (!seen.has(img.src) && !img.src.includes('rsrc.php')) {
            seen.add(img.src);
            const w = img.naturalWidth || img.width || 0;
            const h = img.naturalHeight || img.height || 0;
            if (w >= 300 || h >= 300) {
              // Find parent container text
              let parent = img.closest('div[role="article"]') || img.parentElement?.parentElement?.parentElement;
              let text = parent ? (parent.innerText || '').substring(0, 200).replace(/\\n/g, ' ') : '';
              results.push({
                src: img.src.substring(0, 80),
                w,
                h,
                alt: img.alt || '',
                contextText: text
              });
            }
          }
        }
        return results;
      })()`,
      returnByValue: true
    }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(JSON.stringify(data.result?.result?.value, null, 2));
  ws.close();
};
