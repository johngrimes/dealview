/* global expect */

import { getLastValuation } from './realEstate.js'

import moment from 'moment'

describe('getLastValuation', () => {
  it('should get the correct valuation', () => {
    const realEstate = {
      id: '12345',
      name: '5 Sunrise St',
      address: {
        line1: '5 Sunrise St',
        locality: 'Ashgrove',
        state: 'QLD',
        postcode: '4060'
      },
      notes: 'Home sweet home',
      valuations: [
        {
          date: moment().subtract(3, 'years').format('YYYY-MM-DD'),
          amount: 52000000,
          note: 'Purchase price'
        },
        {
          date: moment().subtract(34, 'months').format('YYYY-MM-DD'),
          amount: 70500000,
          note: 'Sworn valuation'
        },
        {
          date: moment().add(2, 'weeks').format('YYYY-MM-DD'),
          amount: 180000000,
          note: 'Future fantasy'
        }
      ]
    }
    expect(getLastValuation(realEstate).amount).toEqual(70500000)
  })
})
