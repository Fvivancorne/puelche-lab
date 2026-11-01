const WebSocket = globalThis.WebSocket;
const WS_URL = 'ws://127.0.0.1:51227/devtools/page/6AA7ACF44A0BD96D8A13F003F135E71C';
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(() => {
        // Collect all posts by looking for text containers or articles
        const articles = Array.from(document.querySelectorAll('div[role="feed"] > div, div[role="article"]'));
        const posts = [];
        
        for (const art of articles) {
          const text = art.innerText || '';
          const imgs = Array.from(art.querySelectorAll('img[src*="scontent"], img[src*="fbcdn"]'))
            .filter(i => (i.naturalWidth > 150 || i.width > 150))
            .map(i => ({
              src: i.src,
              w: i.naturalWidth,
              h: i.naturalHeight,
              alt: i.alt
            }));
            
          if (imgs.length > 0 || text.length > 50) {
            posts.push({
              textSnippet: text.substring(0, 150).replace(/\\n/g, ' '),
              imageCount: imgs.length,
              images: imgs
            });
          }
        }
        
        return {
          totalArticles: articles.length,
          postsFound: posts.length,
          posts: posts.slice(0, 10)
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
