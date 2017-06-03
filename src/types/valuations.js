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
