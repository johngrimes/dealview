// @flow

import moment from 'moment'

import { DateStorageFormat } from 'types/commonTypes'

type ValuationType = 'none'|'purchase'|'sale'

export type Valuation = {
  +date?: string,
  +amount?: number,
  +note?: string,
  +type: ValuationType,
}
export const ValuationDefault = {
  date: moment().format(DateStorageFormat),
  note: '',
  type: 'none',
}
export type Valuations = Valuation[]

export const PurchaseDefault = {
  note: 'Purchase amount',
  type: 'purchase',
}

export const SaleDefault = {
  note: 'Sale amount',
  type: 'sale',
}

const purchaseFilter = v => v.type === 'purchase'
const purchaseNegFilter = v => v.type !== 'purchase'
const saleFilter = v => v.type === 'sale'
const saleNegFilter = v => v.type !== 'sale'

export const compareValuationsByDate = (a: Valuation, b: Valuation): number => {
  const [ milliA, milliB ] = [ a, b ].map(v => { return v.date ? moment(v.date, DateStorageFormat).valueOf() : 0 })
  return milliA - milliB
}

export const updateValuationsWithPurchase = (valuations: Valuations, purchase: Valuation): Valuations => {
  const found = valuations.find(purchaseFilter)
  const updatedPurchase = { ...PurchaseDefault, ...found, ...purchase }
  return valuations.filter(purchaseNegFilter).concat([updatedPurchase])
}

export const updateValuationsWithSale = (valuations: Valuations, sale: Valuation): Valuations => {
  const found = valuations.find(saleFilter)
  const updatedSale = { ...SaleDefault, ...found, ...sale }
  return valuations.filter(saleNegFilter).concat([updatedSale])
}

