import moment from 'moment'

import { DateStorageFormat } from './commonTypes.js'

export const ValuationDefault = {
  date: moment().format(DateStorageFormat),
  note: '',
  type: 'none',
}

export const PurchaseDefault = {
  note: 'Purchase amount',
  type: 'purchase',
}

export const SaleDefault = {
  note: 'Sale amount',
  type: 'sale',
}

export const purchaseFilter = v => v.type === 'purchase'
export const purchaseNegFilter = v => v.type !== 'purchase'
export const saleFilter = v => v.type === 'sale'
export const saleNegFilter = v => v.type !== 'sale'

export const compareValuationsByDate = (a, b) => {
  const [ milliA, milliB ] = [ a, b ].map(v => {
    return v.date ? moment(v.date, DateStorageFormat).valueOf() : 0
  })
  return milliA - milliB
}

export const updateValuationsWithPurchaseOrSale = (valuations, purchaseOrSale, type) => {
  const found = valuations.find(type === 'purchase' ? purchaseFilter : saleFilter)
  const updatedPurchaseOrSale = {
    ...(type === 'purchase' ? PurchaseDefault : SaleDefault),
    ...found,
    ...purchaseOrSale,
  }
  return valuations.filter(type === 'purchase' ? purchaseNegFilter : saleNegFilter).concat([updatedPurchaseOrSale])
}

export const updateValuationsWithPurchase = (valuations, purchase) =>
  updateValuationsWithPurchaseOrSale(valuations, purchase, 'purchase')

export const updateValuationsWithSale = (valuations, sale) =>
  updateValuationsWithPurchaseOrSale(valuations, sale, 'sale')
