'use strict'
require('babel-register');

var net = require('net');
var shuffle = require('./shuffle');

const PORT = 8900;

let maxPlayers = 6;

let clients = [];

var server = net.createServer().listen(PORT,function(){
  console.log("socket is running at ",PORT)
})
// server.maxConnections = 1;

server.on('connection',(sock) => {
  console.log('detected connection',sock.remoteAddress,sock.remotePort);

  if(clients.length < maxPlayers){
    clients.push[sock];
    if(clients.length == maxPlayers){
      clients.forEach((sock)=>{
        sock.write('All players is ready. The game is on!');
      })
      Game.on(clients);
    }else{
      clients.forEach((sock)=>{
        sock.write(`Waiting for ${maxPlayers - clients.length} more Player join`);
      })
    }
  }else{
    sock.write('Match max connections!');
    sock.close();
    sock.destroy();
  }

})

server.on('error',(e) => console.log('Unhandled error ocured',e.message))