'use strict'

var cards = require('./shuffle')();

let players = [];



let Game = function(socks){
  if(!this instanceof Game){
    return new Games(socks);
  }
  this.socks = socks;
}

Game.prototype = {
  buildPlayers : (socks) => {

    return socks.map((sock) => {
      let player = {};
      player.index
      player.sock = sock;
      player.nuthand = [];
      player.downCards = [];

    });
  },
  init : () => {

  }
};