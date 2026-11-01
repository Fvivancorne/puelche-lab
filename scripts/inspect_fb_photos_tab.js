const fs = require('fs');
const path = require('path');

const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const ws = new WebSocket(WS_URL);
  let messageId = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve } = pending.get(data.id);
      pending.delete(data.id);
      resolve(data.result);
    }
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  console.log('Navigating to Photos section...');
  await send('Page.navigate', { url: 'https://www.facebook.com/PuelcheLabPublicidad/photos' });
  await sleep(4000);

  const evalResult = await send('Runtime.evaluate', {
    expression: `(() => {
      // Find sub-tabs: Fotos subidas, Álbumes, etc.
      const links = Array.from(document.querySelectorAll('a[href*="/photos"]')).map(a => ({
        text: a.innerText,
        href: a.href
      }));
      
      const imgs = Array.from(document.querySelectorAll('img[src*="scontent"], img[src*="fbcdn"]')).map(i => ({
        src: i.src,
        w: i.naturalWidth,
        h: i.naturalHeight
      }));

      return {
        url: window.location.href,
        photoLinks: links,
        imgCount: imgs.length,
        largeImgs: imgs.filter(i => i.w > 150).length
      };
    })()`,
    returnByValue: true
  });

  console.log('Photos state:', JSON.stringify(evalResult.result.value, null, 2));
  ws.close();
}

main().catch(console.error);
