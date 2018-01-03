const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws')
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const wss = new WebSocket.Server({server});
app.use(express.static(__dirname + '/public'));

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients
            .forEach(client => {
                if (client !== ws) {
                    client.send(data);
                }
            });
    });
});

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});