// @flow

import moment from 'moment'

import { DateFormat } from 'types/commonTypes'

export type Valuation = {
  date?: string,
  amount?: number,
  note?: string
}
export const ValuationDefault = {
  date: moment().format(DateFormat),
  note: '',
}
export type Valuations = Valuation[]
