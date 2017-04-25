// @flow

import type { RealEstate, RealEstateWithId } from '../../data/assets/realEstate.js'

export const validRealEstate1: RealEstate = {
  name: '5 Sunrise St',
  address: {
    line1: '5 Sunrise St',
    line2: '',
    line3: '',
    locality: 'Ashgrove',
    state: 'QLD',
    postcode: '4060'
  },
  notes: 'Principal place of residence',
  valuations: [
    { date: '2015-08-25', amount: 520000, note: 'Purchase price' },
    { date: '2016-04-15', amount: 705000, note: 'Formal valuation' }
  ]
}
export const validRealEstateWithId1: RealEstateWithId = { ...validRealEstate1, id: '73' }
