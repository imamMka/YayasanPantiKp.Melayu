
const r2Url = "https://pub-b2ad5628805a4d8b869f60f52b7bdb01.r2.dev/1777460099264-DSC_1085.JPG.jpeg";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function testFetch() {
  console.log(`Testing fetch for: ${r2Url}`);
  try {
    const res = await fetch(r2Url);
    console.log(`Status: ${res.status} ${res.statusText}`);
    if (res.ok) {
      console.log('Success! Image is reachable.');
    } else {
      const text = await res.text();
      console.log(`Error Response: ${text}`);
    }
  } catch (err) {
    console.error('Fetch failed with error:');
    console.error(err);
  }
}

testFetch();
