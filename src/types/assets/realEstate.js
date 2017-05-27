// @flow

import { AddressDefaults } from 'types/commonTypes'
import type { Address } from 'types/commonTypes'
import type { Asset } from 'types/assets/asset'
import type { Valuations } from 'components/forms/ValuationsInput'

export type RealEstate = {
  name: string,
  address: Address,
  notes: string,
  purchaseDate: string,
  saleDate?: string,
  valuations: Valuations
}

export type RealEstateWithId = RealEstate & { id: string }

export type RealEstateMap = { [id: string]: RealEstate }

export const RealEstateDefaults = {
  name: '',
  address: AddressDefaults,
  notes: '',
  purchaseDate: '',
  valuations: [],
}

export const realEstateToAsset = (realEstate: RealEstate): Asset => {
  const asset = {}
  asset.type = 'RealEstate'
  asset.name = realEstate.name
  asset.startDate = realEstate.purchaseDate
  asset.endDate = realEstate.saleDate
  asset.valuations = realEstate.valuations
  if (typeof realEstate.id === 'number') { asset.instanceId = realEstate.id.toString() }
  return asset
}
