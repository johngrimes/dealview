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

export const compareValuationsByDate = (a: Valuation, b: Valuation): number => {
  const [ milliA, milliB ] = [ a, b ].map(v => { return v.date ? moment(v.date, DateStorageFormat).valueOf() : 0 })
  return milliA - milliB
}
