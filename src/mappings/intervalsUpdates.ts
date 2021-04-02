
import {
  Pair1minData,
  Pair5minData,
  Pair15minData,
  Pair30minData,
  Pair1hData,
  Pair3hData,
  Pair6hData,
  Pair12hData,
  Pair1dData,
  Pair3dData
} from './../types/schema'
import { Entity, BigInt, BigDecimal, ethereum } from '@graphprotocol/graph-ts'
import { Pair, Bundle, Token, UniswapFactory, UniswapDayData, PairDayData, TokenDayData } from '../types/schema'
import { ONE_BI, ZERO_BD, ZERO_BI, FACTORY_ADDRESS } from './helpers'

export function updateIntervalsData (event: ethereum.Event): void{
  update1minData(event)
  update5minData(event)
  update15minData(event)
  update30minData(event)
  update1hData(event)
  update3hData(event)
  update6hData(event)
  update12hData(event)
  update1dData(event)
  update3dData(event)
}


function update1minData (event: ethereum.Event): void {
    let intervalInSec = 60 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair1minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair1minData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}

function update5minData (event: ethereum.Event): void {
    let intervalInSec = 300 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair5minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair5minData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}


function update15minData (event: ethereum.Event): void {
    let intervalInSec = 900 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair15minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair15minData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}

function update30minData (event: ethereum.Event): void {
    let intervalInSec = 1800 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair30minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair30minData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}

function update1hData (event: ethereum.Event): void {
    let intervalInSec = 3600 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair1hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair1hData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}

function update3hData (event: ethereum.Event): void {
    let intervalInSec = 10800 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair3hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair3hData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}

function update6hData (event: ethereum.Event): void {
    let intervalInSec = 21600 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair6hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair6hData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}

function update12hData (event: ethereum.Event): void {
    let intervalInSec = 43200 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair12hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair12hData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}

function update1dData (event: ethereum.Event): void {
    let intervalInSec = 86400 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair1dData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair1dData (intervalEntityID)

      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}


function update3dData (event: ethereum.Event): void {
    let intervalInSec = 259200 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let token1 = Token.load(pair.token1)
    let bundle = Bundle.load('1')

    let token0USD = token0.derivedBNB.times(bundle.bnbPrice)
    let token1USD = token1.derivedBNB.times(bundle.bnbPrice)

    let pairIntervalData = Pair3dData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair3dData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token1Price
      pairIntervalData.openToken0Price = pair.token0Price
      pairIntervalData.openToken1USD = token1USD
      pairIntervalData.openToken0USD = token0USD
      pairIntervalData.openToken0BNB = token0.derivedBNB
      pairIntervalData.openToken1BNB = token1.derivedBNB

      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB

      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.highToken1USD = token1USD
      pairIntervalData.highToken0USD = token0USD
      pairIntervalData.highToken0BNB = token0.derivedBNB
      pairIntervalData.highToken1BNB = token1.derivedBNB

      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
      pairIntervalData.lowToken1USD = token1USD
      pairIntervalData.lowToken0USD = token0USD
      pairIntervalData.lowToken0BNB = token0.derivedBNB
      pairIntervalData.lowToken1BNB = token1.derivedBNB

    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken1USD = token1USD
      pairIntervalData.closeToken0USD = token0USD
      pairIntervalData.closeToken0BNB = token0.derivedBNB
      pairIntervalData.closeToken1BNB = token1.derivedBNB
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price

    pairIntervalData.highToken0USD = pairIntervalData.highToken0USD > token0USD ?  pairIntervalData.highToken0USD : token0USD
    pairIntervalData.highToken1USD = pairIntervalData.highToken1USD > token1USD ?  pairIntervalData.highToken1USD : token1USD
    pairIntervalData.lowToken0USD = pairIntervalData.lowToken0USD < token0USD ?  pairIntervalData.lowToken0USD : token0USD
    pairIntervalData.lowToken1USD = pairIntervalData.lowToken1USD < token1USD ?  pairIntervalData.lowToken1USD : token1USD

    pairIntervalData.highToken0BNB = pairIntervalData.highToken0BNB > token0.derivedBNB ?  pairIntervalData.highToken0BNB : token0.derivedBNB
    pairIntervalData.highToken1BNB = pairIntervalData.highToken1BNB > token1.derivedBNB ?  pairIntervalData.highToken1BNB : token1.derivedBNB
    pairIntervalData.lowToken0BNB = pairIntervalData.lowToken0BNB < token0.derivedBNB ?  pairIntervalData.lowToken0BNB : token0.derivedBNB
    pairIntervalData.lowToken1BNB = pairIntervalData.lowToken1BNB < token1.derivedBNB ?  pairIntervalData.lowToken1BNB : token1.derivedBNB
    pairIntervalData.save()
}