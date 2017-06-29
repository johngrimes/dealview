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

export const purchaseFilter = (v: Valuation) => v.type === 'purchase'
export const purchaseNegFilter = (v: Valuation) => v.type !== 'purchase'
export const saleFilter = (v: Valuation) => v.type === 'sale'
export const saleNegFilter = (v: Valuation) => v.type !== 'sale'

export const compareValuationsByDate = (a: Valuation, b: Valuation): number => {
  const [ milliA, milliB ] = [ a, b ].map(v => { return v.date ? moment(v.date, DateStorageFormat).valueOf() : 0 })
  return milliA - milliB
}

export const updateValuationsWithPurchaseOrSale = (valuations: Valuations, purchaseOrSale: Valuation, type: 'purchase'|'sale'): Valuations => {
  const found = valuations.find(type === 'purchase' ? purchaseFilter : saleFilter)
  const updatedPurchaseOrSale = {
    ...(type === 'purchase' ? PurchaseDefault : SaleDefault),
    ...found,
    ...purchaseOrSale,
  }
  return valuations.filter(type === 'purchase' ? purchaseNegFilter : saleNegFilter)
    .concat([updatedPurchaseOrSale])
}

export const updateValuationsWithPurchase = (valuations: Valuations, purchase: Valuation): Valuations => {
  return updateValuationsWithPurchaseOrSale(valuations, purchase, 'purchase')
}

export const updateValuationsWithSale = (valuations: Valuations, sale: Valuation): Valuations => {
  return updateValuationsWithPurchaseOrSale(valuations, sale, 'sale')
}
