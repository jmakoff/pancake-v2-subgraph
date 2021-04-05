import { Pair1minData } from './../types/schema'
import { Swap } from '../types/templates/Pair/Pair'
import { log } from '@graphprotocol/graph-ts'
import { convertTokenToDecimal } from './helpers'
import { Pair, Bundle, Token } from '../types/schema'


export function updateIntervalsVolumes (event: Swap, pairInstance: Pair1minData): void{
	let pair = Pair.load(event.address.toHexString())
    let token0 = Token.load(pair.token0)
    let bundle = Bundle.load('1')

    let amount0In = convertTokenToDecimal(event.params.amount0In, token0.decimals)
    let amount0Out = convertTokenToDecimal(event.params.amount0Out, token0.decimals)
    pairInstance.volumeBNB = amount0In.plus(amount0Out).times(token0.derivedBNB)
    pairInstance.volumeUSD = pairInstance.volumeBNB.times(bundle.bnbPrice)
    pairInstance.save()
}