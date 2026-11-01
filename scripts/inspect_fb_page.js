const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        const imgs = Array.from(document.querySelectorAll('img[src*="scontent"], img[src*="fbcdn"]'));
        return {
          count: imgs.length,
          sample: imgs.slice(0, 10).map(img => ({
            src: img.src,
            w: img.naturalWidth,
            h: img.naturalHeight,
            alt: img.alt
          }))
        };
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

ws.onerror = (err) => {
  console.error('WS Error:', err);
};
