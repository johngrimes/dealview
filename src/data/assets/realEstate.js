// @flow

import { save as saveToDatabase, load as loadFromDatabase } from '../database.js'
import { AddressEmpty } from '../commonTypes.js'
import type { Values } from '../database.js'
import type { AddressValues } from '../commonTypes.js'

export type RealEstateValues = {
  id: string,
  name: string,
  address: AddressValues,
  notes: string
}

export const RealEstateEmpty = {
  id: '',
  name: '',
  address: AddressEmpty,
  notes: ''
}

export const save = (values: Values): Promise<string> => {
  return saveToDatabase('Asset.RealEstate', values)
}

export const load = (id: string): Promise<RealEstateValues> => {
  return loadFromDatabase('Asset.RealEstate', id)
}
