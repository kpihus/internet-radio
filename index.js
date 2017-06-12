const {app, BrowserWindow} = require('electron');
require('electron-reload')(__dirname, {
  electron: require('${__dirname}/../../node_modules/electron')
})

const path = require('path');
const url = require('url');
const express = require('express');
const server = new express();
const player = require('./player');

const ws = require('http').Server(server);

const io = require('socket.io')(ws);

let _socket;

io.on('connection', function (socket) {
  _socket = socket;
  console.log('Client connected', socket.id)
  socket.on('givestations', function () {
    console.log('Stations wanted...') // TODO: REMOVE
    sendStations(socket);
  });
  socket.on('PLAY', function (id) {
    socket.emit('LOADING', id);
    player.startPlay(id);
    console.log('LETS PLAY', id) // TODO: REMOVE
  })
});

ws.listen(3003, function () {
  console.log('WebSocket listening on 3003')
});


function sendStations (socket) {

  let stations = require('./stations.json');
  console.log('Sending stations ...', stations)
  socket.emit('STATIONSLIST', stations);
}


//Setup electron
let win;
function createWindow () {
  win = new BrowserWindow({width: 1000, height: 480});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  // win.webContents.openDevTools();
  win.setFullScreen(true);

  win.on('closed', () => {
    win = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    player.stopPlay();
    app.quit();
    process.exit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

module.exports = {socket: _socket};

