// @flow

import moment from 'moment'

import { DateStorageFormat } from 'types/commonTypes'

export type Valuation = {
  +date?: string,
  +amount?: number,
  +note?: string
}
export const ValuationDefault = {
  date: moment().format(DateStorageFormat),
  note: '',
}
export type Valuations = Valuation[]

export const compareValuationsByDate = (a: Valuation, b: Valuation): number => {
  const [ milliA, milliB ] = [ a, b ].map(v => { return v.date ? moment(v.date, DateStorageFormat).valueOf() : 0 })
  return milliA - milliB
}
