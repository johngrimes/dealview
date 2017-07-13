import { AddressDefaults } from './commonTypes.js'

export const RealEstateDefaults = {
  name: '',
  address: AddressDefaults,
  notes: '',
  purchaseDate: '',
  valuations: [],
}

export const realEstateToAsset = realEstate => {
  const asset = {}
  asset.type = 'RealEstate'
  asset.name = realEstate.name
  asset.startDate = realEstate.purchaseDate
  asset.endDate = realEstate.saleDate
  asset.valuations = realEstate.valuations
  if (typeof realEstate.id === 'string') {
    asset.id = realEstate.id
  }
  return asset
}
