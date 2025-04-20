// import modules
const http = require('http');
const WebSocket = require('ws'); // make sure you run "npm install ws" 

const server = http.createServer((req, res) => {
  if (req.url === '/hello') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write("he");
    res.write("ll");
    res.end('o');
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

// mount websocket server onto http server
const socket = new WebSocket.Server({ server });

// handle ws connection request
socket.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.send('hello');
//   immediately close ws connection
  ws.close();

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });

});

// listen on port 8080
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
