// @flow

import moment from 'moment'

import { AddressDefaults, DateFormat } from '../commonTypes.js'
import type { Address } from '../commonTypes.js'
import type { Asset } from './asset.js'
import type { Valuations, Valuation } from '../../components/forms/ValuationsInput.js'

export type RealEstate = {
  name: string,
  address: Address,
  notes: string,
  purchaseDate?: string,
  saleDate?: string,
  valuations: Valuations
}

export type RealEstateWithId = RealEstate & { id: string }

export type RealEstateMap = { [id: string]: RealEstate }

export const RealEstateDefaults = {
  name: '',
  address: AddressDefaults,
  notes: '',
  valuations: []
}

export const realEstateToAsset = (realEstate: RealEstate): Asset => {
  const lastValuation = getLastValuation(realEstate)
  const asset = {}
  asset.type = 'RealEstate'
  asset.name = realEstate.name
  if (typeof realEstate.id === 'number') { asset.instanceId = realEstate.id.toString() }
  if (realEstate.purchaseDate) { asset.startDate = realEstate.purchaseDate }
  if (realEstate.saleDate) { asset.startDate = realEstate.saleDate }
  if (lastValuation) { asset.lastValuation = lastValuation.amount }
  return asset
}

export const getLastValuation = (realEstate: RealEstate): Valuation|false => {
  if (realEstate.valuations.length === 0) {
    return false
  }
  const sortedValuations = realEstate.valuations.slice().sort(compareValuationsByDate)
  const idxFuture = sortedValuations.findIndex(v => { moment(v.date, DateFormat).valueOf() > moment().valueOf() })
  const slicedValuations = sortedValuations.slice(0, idxFuture)
  return slicedValuations[slicedValuations.length - 1]
}

const compareValuationsByDate = (a: Valuation, b: Valuation): number => {
  const [milliA, milliB] = [a, b].map(v => { return v.date ? moment(v.date).valueOf() : 0 })
  return milliA - milliB
}
