import { AddressDefaults } from './commonTypes.js'
import { saleNegFilter } from './valuations.js'

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
  // Sale valuations are omitted from the valuations that get stored against the asset.
  // The asset was never worth that much on our balance sheet - that value immediately went to cash, or whatever else.
  asset.valuations = realEstate.valuations.filter(saleNegFilter)
  if (typeof realEstate.id === 'string') {
    asset.id = realEstate.id
  }
  return asset
}
