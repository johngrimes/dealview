// @flow

import type { Dispatch } from 'redux'

export type Thunk = (dispatch: Dispatch) => any

export type ObjectMap = { [id: string]: Object }
export type ObjectWithId = Object & { +id: string }

export type Address = {
  +line1: string,
  +line2: string,
  +line3: string,
  +locality: string,
  +state: string,
  +postcode: string,
}

export const AddressDefaults = {
  line1: '',
  line2: '',
  line3: '',
  locality: '',
  state: '',
  postcode: '',
}

export const DateDisplayFormat = 'D MMM YYYY'
export const DateStorageFormat = 'YYYY-MM-DD'

export const formatNumber = (number: number): string => {
  const numString = number.toString()
  // The Array.from is a workaround for https://github.com/facebook/flow/issues/1059, and can be removed once this is resolved.
  return [...Array.from(numString)].reduce((prev, curr, i, arr) => {
    return (arr.length - i - 1) !== 0 && (arr.length - i - 1) % 3 === 0
      ? prev + curr + ','
      : prev + curr
  }, '')
}

export const formatDollars = (number: number): string => '$' + formatNumber(number)
