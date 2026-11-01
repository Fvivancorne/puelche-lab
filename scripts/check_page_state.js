const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        return {
          url: window.location.href,
          scrollY: window.scrollY,
          bodyHeight: document.body.scrollHeight,
          allImgs: Array.from(document.querySelectorAll('img')).map(i => ({
            src: i.src,
            w: i.naturalWidth,
            h: i.naturalHeight,
            visible: i.offsetParent !== null
          })).filter(i => i.w > 100)
        };
      })()`,
      returnByValue: true
    }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Result:', JSON.stringify(data.result?.result?.value, null, 2));
  ws.close();
};
