'use strict'
/*
  club    : 梅花
  diamond : 方片
  heart   : 红桃
  spade   : 黑桃
 */
const cards = [
  {point : '2', weight : 2, suit : 'c'},{point : '3', weight : 3, suit : 'c'},{point : '4', weight : 4, suit : 'c'},{point : '5', weight : 5, suit : 'c'},{point : '6', weight : 6, suit : 'c'},{point : '7', weight : 7, suit : 'c'},{point : '8', weight : 8, suit : 'c'},{point : '9', weight : 9, suit : 'c'},{point : '10', weight : 10, suit : 'c'},{point : 'J', weight : 11, suit : 'c'},{point : 'Q', weight : 12, suit : 'c'},{point : 'K', weight : 13, suit : 'c'},{point : 'A', weight : 14, suit : 'c'},
  {point : '2', weight : 2, suit : 'd'},{point : '3', weight : 3, suit : 'd'},{point : '4', weight : 4, suit : 'd'},{point : '5', weight : 5, suit : 'd'},{point : '6', weight : 6, suit : 'd'},{point : '7', weight : 7, suit : 'd'},{point : '8', weight : 8, suit : 'd'},{point : '9', weight : 9, suit : 'd'},{point : '10', weight : 10, suit : 'd'},{point : 'J', weight : 11, suit : 'd'},{point : 'Q', weight : 12, suit : 'd'},{point : 'K', weight : 13, suit : 'd'},{point : 'A', weight : 14, suit : 'd'},
  {point : '2', weight : 2, suit : 'h'},{point : '3', weight : 3, suit : 'h'},{point : '4', weight : 4, suit : 'h'},{point : '5', weight : 5, suit : 'h'},{point : '6', weight : 6, suit : 'h'},{point : '7', weight : 7, suit : 'h'},{point : '8', weight : 8, suit : 'h'},{point : '9', weight : 9, suit : 'h'},{point : '10', weight : 10, suit : 'h'},{point : 'J', weight : 11, suit : 'h'},{point : 'Q', weight : 12, suit : 'h'},{point : 'K', weight : 13, suit : 'h'},{point : 'A', weight : 14, suit : 'h'},
  {point : '2', weight : 2, suit : 's'},{point : '3', weight : 3, suit : 's'},{point : '4', weight : 4, suit : 's'},{point : '5', weight : 5, suit : 's'},{point : '6', weight : 6, suit : 's'},{point : '7', weight : 7, suit : 's'},{point : '8', weight : 8, suit : 's'},{point : '9', weight : 9, suit : 's'},{point : '10', weight : 10, suit : 's'},{point : 'J', weight : 11, suit : 's'},{point : 'Q', weight : 12, suit : 's'},{point : 'K', weight : 13, suit : 's'},{point : 'A', weight : 14, suit : 's'},
];

const randomInt = (num) => Math.floor(Math.random()*num);

let shuffle = () => {
  let copy = [].slice.apply(cards),
      ready = [];

  while(copy.length){
    let index = randomInt(copy.length);
    ready = ready.concat(copy.splice(index,1));
  }

  return ready;
}

module.exports = shuffle;
