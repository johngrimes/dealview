// @flow

import type { Dispatch } from 'redux'

export type Thunk = (dispatch: Dispatch) => any

export type ObjectMap = { [id: string]: Object }

export type Address = {
  line1: string,
  line2: string,
  line3: string,
  locality: string,
  state: string,
  postcode: string
}

export const AddressDefaults = {
  line1: '',
  line2: '',
  line3: '',
  locality: '',
  state: '',
  postcode: ''
}

export const DateFormat = 'YYYY-MM-DD'
