const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(async () => {
        const imgs = Array.from(document.querySelectorAll('img[src*="scontent"]')).filter(i => i.naturalWidth > 150);
        if (!imgs.length) return { error: 'No images found' };
        const testImg = imgs[0];
        try {
          const res = await fetch(testImg.src);
          const blob = await res.blob();
          return {
            status: res.status,
            size: blob.size,
            type: blob.type
          };
        } catch(err) {
          return { error: err.message };
        }
      })()`,
      awaitPromise: true,
      returnByValue: true
    }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Result:', JSON.stringify(data.result?.result?.value, null, 2));
  ws.close();
};
