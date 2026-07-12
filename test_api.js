const http = require('http');

async function testTicker(ticker) {
  console.log(`\n========================================`);
  console.log(`🔍 Testing Ticker / Query: "${ticker}"`);
  console.log(`========================================`);
  try {
    const res = await fetch('http://localhost:3000/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ticker })
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ HTTP Error (${res.status}):`, text);
      return false;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let completed = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        try {
          const event = JSON.parse(line.slice(6));
          if (event.type === "status") {
            console.log(`⏳ [Status] Node: ${event.node} -> ${event.message}`);
          } else if (event.type === "complete") {
            completed = true;
            console.log(`✅ [Success] Report generated successfully!`);
            console.log(`   Ticker: ${event.data.ticker}`);
            console.log(`   Company: ${event.data.companySnapshot.name}`);
            console.log(`   Asset Type: ${event.data.companySnapshot.assetType}`);
            console.log(`   Overall Score: ${event.data.scorecard.overallScore}/10`);
          } else if (event.type === "error") {
            console.error(`❌ [Error Event]: ${event.message}`);
          }
        } catch (err) {
          // Ignore parse errors on partial chunks
        }
      }
    }
    return completed;
  } catch (e) {
    console.error(`❌ Request Failed for "${ticker}":`, e.message);
    return false;
  }
}

async function run() {
  await testTicker("Bitcoin");
  await testTicker("SMCI");
  await testTicker("asdfasdf");
}
run();
