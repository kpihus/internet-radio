var Mplayer = require('mplayer');
var socket = require('./index').socket;

var player = new Mplayer();


function findStation (id) {
  var stations = require('./stations.json');
  let toplay = stations.find(function(item){
    return item.id === id;
  })
  return toplay.url;
}

player.on('start', console.log.bind(this, 'playback started'));
player.on('status', function(status){
  // socket.emit('TITLE', status.title)
  console.log('STATUS', status) // TODO: REMOVE
});



exports.startPlay = function(id) {
  const url = findStation(id);
  player.openFile(url, {
    cache: 128,
    cacheMin: 1
  });
};

exports.stopPlay = function() {
  player.stop();
}
