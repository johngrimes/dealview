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

export const validRealEstate2: RealEstate = {
  name: '38/8 Briggs Rd',
  address: {
    line1: 'Unit 38, Capertree Gardens',
    line2: '8 Briggs Rd',
    line3: '',
    locality: 'Springwood',
    state: 'QLD',
    postcode: '4127'
  },
  notes: 'Investment property',
  valuations: [
    { date: '2015-09-10', amount: 260000, note: 'Formal valuation' }
  ]
}
export const validRealEstateWithId2: RealEstateWithId = { ...validRealEstate1, id: '78' }
