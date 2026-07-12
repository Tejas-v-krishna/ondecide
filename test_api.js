const http = require('http');

async function testTicker(ticker) {
  console.log(`Testing ticker: ${ticker}`);
  try {
    const res = await fetch('http://localhost:3000/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ticker })
    });
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let success = false;
    while(true) {
      const {done, value} = await reader.read();
      if(done) break;
      const chunk = decoder.decode(value);
      if (chunk.includes('"type":"complete"')) success = true;
      if (chunk.includes('"type":"error"')) {
        console.error(`Error for ${ticker}:`, chunk);
        return false;
      }
    }
    console.log(`✅ Success for ${ticker}:`, success);
    return success;
  } catch(e) {
    console.error(`❌ Failed request for ${ticker}:`, e);
    return false;
  }
}

async function run() {
  await testTicker("AAPL");
  await testTicker("SMCI");
  await testTicker("BTC");
  await testTicker("asdfasdf");
}
run();
