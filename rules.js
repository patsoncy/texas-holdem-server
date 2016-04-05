'use strict'
// 皇家同花顺 Royal Straight Flush
// 同花顺 Straight Flush
// 四条 Four of a kind
// 葫芦 Full house, boat
// 同花 Straight
// 顺子 Flush
// 三条 Three of kind
// 两对 Two pair
// 一对 One pair
// 高牌 High card

// 手牌 pocket
// 最佳手牌 nut hand
var _ = require('lodash');

const DESCENDING_SORT = (a,b) => b.weight - a.weight;

let nutHand = [];
const calculation = (() => {
  const isRoyalStraightFlush = (pocket) => {
    return isStraightFlush(pocket)
      && nutHand.some((card) => card.point == 'A')
      && nutHand.some((card) => card.point == 'J');
  };

  const isStraightFlush = (pocket) => {
    return _straight(pocket) && isFlush(nutHand);
  };

  const isStraight = (pocket) => {
    _straight(pocket);
    if(!!nutHand.length){
      nutHand.length = 5;
    }
    return !!nutHand.length;
  };

  const _straight = (pocket) => {
    let suitGroup = _.groupBy(pocket, 'suit'),
        straightSuit = Object.keys(suitGroup).filter((suit) => suitGroup[suit].length > 4)[0];

    if(straightSuit){
      nutHand = pocket.filter((card) => card.suit == straightSuit).sort(DESCENDING_SORT);
    }
    return !!nutHand.length;
  }

  const isFlush = (pocket) => {
    let isFlush = false;

    const _getFlush = (hand) => {
      let i = 0;
      while(hand[i+4]){
        let tmp = hand.slice(i,i+5);
        if(tmp.every((cur,index) => index != 4 ? ((cur.weight - tmp[index+1].weight) == 1) : true)){
          nutHand = tmp;
          isFlush = true;
          break;
        }
        i++;
      }
    }
    _getFlush(pocket);
    // check A 2 3 4 5
    if(!isFlush){
      pocket.forEach((card,index) => card.point == 'A' && (pocket[index].weight = 1));
      pocket.sort(DESCENDING_SORT);
      _getFlush(pocket);
    }
    nutHand.forEach((card,index) => card.point == 'A' && (nutHand[index].weight = 14));

    return isFlush;
  };

  const isFourOfAKind = (pocket) => {
    let pointGroup = _.groupBy(pocket,'point');
    let foakPoint = Object.keys(pointGroup).filter((point) => pointGroup[point].length == 4)[0]
    if(foakPoint){
      nutHand = pointGroup[foakPoint].concat(pocket.filter((card)=>card.point != foakPoint).sort(DESCENDING_SORT)[0]);
    }
    return !!foakPoint;
  };

  const isFullHouse = (pocket) => {
    let isFH = false;
    let pointGroup = _.groupBy(pocket,'point');
    let fhPoint = Object.keys(pointGroup).filter((point) => pointGroup[point].length == 3);// ['A','6']
    if(!!fhPoint.length){
      if(fhPoint.length == 1){
        let leftCards = pocket.filter((card) => card.point != fhPoint[0]);
        let pointGroup = _.groupBy(leftCards,'point');
        let pairPoint = Object.keys(pointGroup).filter((point) => pointGroup[point].length == 2);
        if(!!pairPoint.length){
          nutHand = pocket.filter((card) => card.point == fhPoint[0]);
          if(pairPoint.length == 1){
            nutHand = nutHand.concat(pointGroup[pairPoint[0]]);
          }else if(pairPoint.length == 2){
            let maxWeight = Math.max(...(pairPoint.map((point) => pocket.filter((card) => card.point == point)[0].weight)));
            let maxPoint = leftCards.filter((card) => card.weight == maxWeight)[0].point;
            nutHand = nutHand.concat(pointGroup[maxPoint]);
          }
          isFH = true;
        }
      }else if(fhPoint.length == 2){
        // double 3 of a kind
        let maxWeight = Math.max(...(fhPoint.map((point) => pocket.filter((card) => card.point == point)[0].weight))),
            maxPoint = pocket.filter((card) => card.weight == maxWeight)[0].point,
            minPonit = fhPoint.filter((p) => p != maxPoint)[0];
        nutHand = pocket.filter((card) => card.point == maxPoint).concat(pocket.filter((card)=>card.point == minPonit).slice(0,2));
        isFH = true;
      }
    }
    return isFH;
  };

  const isThreeOfAKind = (pocket) => {
    let isToak = false;
    let pointGroup = _.groupBy(pocket,'point');
    let toakPoint = Object.keys(pointGroup).filter((point) => pointGroup[point].length == 3)[0]
    if(toakPoint){
      let leftCards = pocket.filter((card) => card.point != toakPoint).sort(DESCENDING_SORT);
      let leftPonitGroup = _.groupBy(leftCards,'point')
      // 除去三张外的牌都是单牌才是三张
      if(Object.keys(leftPonitGroup).every((point) => leftPonitGroup[point].length == 1)){
        nutHand = pocket.filter((card) => card.point == toakPoint).concat(leftCards.slice(0,2));
        isToak = true;
      }
    }
    return !!isToak;
  };

  const isTwoPair = (pocket) => {
    let pointGroup = _.groupBy(pocket,'point'),
        isTwoPair = false;

    let pairPoints = Object.keys(pointGroup).filter((point) => pointGroup[point].length == 2);
    if(pairPoints.length > 1){
      let twoBigPair = pocket.filter((card) => !!~pairPoints.indexOf(card.point)).sort(DESCENDING_SORT).slice(0,4);
      let bigPairPonit = twoBigPair.map((card) => card.point);
      nutHand = twoBigPair.concat(pocket.filter((card)=> !~bigPairPonit.indexOf(card.point)).sort(DESCENDING_SORT).slice(0,1));
      isTwoPair = true;
    }
    return isTwoPair;
  };

  const isOnePair = (pocket) => {
    let pointGroup = _.groupBy(pocket,'point'),
        isOnePair = false;

    let pairPoint = Object.keys(pointGroup).filter((point) => pointGroup[point].length == 2)[0];
    if(pairPoint){
      let onePair = pocket.filter((card) => pairPoint == card.point);
      nutHand = onePair.concat(pocket.filter((card)=> pairPoint != card.point).sort(DESCENDING_SORT).slice(0,3));
      isOnePair = true;
    }
    return isOnePair;
  };

  const isHighCard = (pocket) => {
    nutHand = pocket.slice(0,5);
    return true;
  };
  return {
    isStraight : isStraight,
    isFourOfAKind : isFourOfAKind,
    isFlush : isFlush,
    isStraightFlush : isStraightFlush,
    isRoyalStraightFlush : isRoyalStraightFlush,
    isFourOfAKind : isFourOfAKind,
    isThreeOfAKind : isThreeOfAKind,
    isFullHouse : isFullHouse,
    isTwoPair : isTwoPair,
    isOnePair : isOnePair,
    isHighCard : isHighCard,
  };
})();

Object.keys(calculation).forEach((method) => {
  let func = calculation[method];
  if(method !== 'output'){
    calculation[method] = (pocket) => {
      if(Array.isArray(pocket)){
        pocket = pocket.sort(DESCENDING_SORT)
      }
      let result = func.call(null, pocket);
      return result;
    }
  }
})

// var shuffle = require('./shuffle')
// let pocketSample = shuffle().slice(0,7)
// console.log(calculation.isHighCard(pocketSample))
module.exports = calculation
