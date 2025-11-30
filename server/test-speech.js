const http = require('http');

// Test basic GET
const getOptions = {
  hostname: 'localhost',
  port: 5001,
  path: '/',
  method: 'GET'
};

console.log('Testing GET /');
const getReq = http.request(getOptions, (res) => {
  console.log(`GET / Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('GET Response:', data);
    testSpeechEndpoint();
  });
});

getReq.on('error', (e) => {
  console.error(`GET request error: ${e.message}`);
});

getReq.end();

// Test speech endpoint
function testSpeechEndpoint() {
  console.log('\nTesting POST /speech');
  
  const postData = JSON.stringify({
    text: 'hello world'
  });

  const postOptions = {
    hostname: 'localhost',
    port: 5001,
    path: '/speech',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const postReq = http.request(postOptions, (res) => {
    console.log(`POST /speech Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);
    
    if (res.headers['x-viseme']) {
      try {
        const visemeData = JSON.parse(res.headers['x-viseme']);
      } catch (e) {
        console.error('Error parsing viseme data:', e.message);
      }
    }
    
    let audioDataLength = 0;
    res.on('data', (chunk) => {
      audioDataLength += chunk.length;
    });
    
    res.on('end', () => {
      console.log(`Audio data received: ${audioDataLength} bytes`);
      console.log('Test completed successfully!');
      process.exit(0);
    });
  });

  postReq.on('error', (e) => {
    console.error(`POST request error: ${e.message}`);
  });

  postReq.write(postData);
  postReq.end();
}
