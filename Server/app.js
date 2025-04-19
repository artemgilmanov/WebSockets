const http = require('http');
const WebSocketServer = require('websocket').server;

const httpServer = http.createServer((req, res) => {
  res.writeHead(200, {
    'access-control-allow-origin': '*',
  });

  res.end('some message');
});

httpServer.listen(8080, () => {
  console.log('The http server is listening on port 8080');
});

let websocket = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false,
});

function isOriginAllowed(origin) {
  return true;
}

websocket.on('request', (req) => {
  if (!isOriginAllowed(req.origin)) {
    req.reject(403, 'Sorry you are not allowed here');
    console.log("Client's request rejected from origin:" + req.origin);
  }

  let connection = req.accept();
  connection.send('Connection established');
  console.log('Connection established and accepted');

  connection.on('message', (message) => {
    connection.send(`Ping. Message recieved from client: ${message.utf8Data}`);
  });

  connection.on('close', (code, reason) => {
    console.log(`Peer connection ${connection.remoteAdress} disconnected. 
        The reason is: ${reason} and the closure code is: ${code}`);
  });
});
