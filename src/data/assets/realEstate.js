// @flow

import { AddressDefaults } from '../commonTypes.js'
import type { Address } from '../commonTypes.js'
import type { Valuations } from '../../components/forms/ValuationsInput.js'

export type RealEstate = {
  name: string,
  address: Address,
  notes: string,
  valuations: Valuations
}

export type RealEstateWithId = RealEstate & { id: string }

export type RealEstateMap = { [id: string]: RealEstate }

export const RealEstateDefaults = {
  name: '',
  address: AddressDefaults,
  notes: '',
  valuations: []
}
