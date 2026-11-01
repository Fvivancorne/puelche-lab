const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        const text = document.body.innerText;
        return {
          hasArrebol: text.toLowerCase().includes('arrebol'),
          hasReparabrisas: text.toLowerCase().includes('reparabrisas'),
          hasWineFest: text.toLowerCase().includes('winefest') || text.toLowerCase().includes('wine fest'),
          hasTransforma: text.toLowerCase().includes('transforma'),
          hasNazca: text.toLowerCase().includes('nazca')
        };
      })()`,
      returnByValue: true
    }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Search in page:', JSON.stringify(data.result?.result?.value, null, 2));
  ws.close();
};
