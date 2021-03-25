
import {
  Pair1minData,
  Pair3minData,
  Pair5minData,
  Pair30minData,
  Pair1hData,
  Pair2hData,
  Pair4hData,
  Pair6hData,
  Pair1dData
} from './../types/schema'
import { Entity, BigInt, BigDecimal, ethereum } from '@graphprotocol/graph-ts'
import { Pair, Bundle, Token, UniswapFactory, UniswapDayData, PairDayData, TokenDayData } from '../types/schema'
import { ONE_BI, ZERO_BD, ZERO_BI, FACTORY_ADDRESS } from './helpers'

export function updateIntervalsData (event: ethereum.Event): void{
  update1minData(event)
  update3minData(event)
  update5minData(event)
  update30minData(event)
  update1hData(event)
  update2hData(event)
  update4hData(event)
  update6hData(event)
  update1dData(event)
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

    let pairIntervalData = Pair1minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair1minData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
    pairIntervalData.save()
}

function update3minData (event: ethereum.Event): void {
    let intervalInSec = 180 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())

    let pairIntervalData = Pair3minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair3minData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
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

    let pairIntervalData = Pair5minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair5minData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
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

    let pairIntervalData = Pair30minData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair30minData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
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

    let pairIntervalData = Pair1hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair1hData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
    pairIntervalData.save()
}

function update2hData (event: ethereum.Event): void {
    let intervalInSec = 7200 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())

    let pairIntervalData = Pair2hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair2hData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
    pairIntervalData.save()
}

function update4hData (event: ethereum.Event): void {
    let intervalInSec = 14400 //value of period in sec

    let timestamp = event.block.timestamp.toI32()
    let intervalIndex = timestamp /  intervalInSec // get unique interval within unix history
    let intervalStartUnix = intervalIndex * intervalInSec // want the rounded effect
    let intervalEntityID = event.address
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(intervalIndex).toString())
    let pair = Pair.load(event.address.toHexString())

    let pairIntervalData = Pair4hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair4hData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
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

    let pairIntervalData = Pair6hData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair6hData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
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

    let pairIntervalData = Pair1dData.load(intervalEntityID)
    if (pairIntervalData === null) {
      pairIntervalData = new Pair1dData (intervalEntityID)


      pairIntervalData.startTimestamp = intervalStartUnix
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.pair = pair.id
      pairIntervalData.openToken1Price = pair.token0Price
      pairIntervalData.openToken0Price = pair.token1Price
      pairIntervalData.closeToken1Price = pair.token1Price
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.highToken1Price = pair.token1Price
      pairIntervalData.highToken0Price = pair.token0Price
      pairIntervalData.lowToken1Price = pair.token1Price
      pairIntervalData.lowToken0Price = pair.token0Price
    }
    if (pairIntervalData.maxTimestamp < timestamp){
      pairIntervalData.maxTimestamp = timestamp
      pairIntervalData.closeToken0Price = pair.token0Price
      pairIntervalData.closeToken1Price = pair.token1Price
    }
    pairIntervalData.highToken0Price = pairIntervalData.highToken0Price > pair.token0Price ?  pairIntervalData.highToken0Price : pair.token0Price
    pairIntervalData.highToken1Price = pairIntervalData.highToken1Price > pair.token1Price ?  pairIntervalData.highToken1Price : pair.token1Price
    pairIntervalData.lowToken0Price = pairIntervalData.lowToken0Price < pair.token0Price ?  pairIntervalData.lowToken0Price : pair.token0Price
    pairIntervalData.lowToken1Price = pairIntervalData.lowToken1Price < pair.token1Price ?  pairIntervalData.lowToken1Price : pair.token1Price
    pairIntervalData.save()
}