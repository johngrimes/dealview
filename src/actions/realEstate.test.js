/* global expect */

import { getLastValuation } from './realEstate.js'

import moment from 'moment'

import { RealEstate } from '../data/assets/realEstate.js'
import { DateFormat, Address } from '../data/commonTypes.js'
import { Valuation } from '../components/forms/ValuationsInput.js'

describe('getLastValuation', () => {
  it('should get the correct valuation', () => {
    const realEstate = new RealEstate({
      id: '12345',
      name: '5 Sunrise St',
      address: new Address({
        line1: '5 Sunrise St',
        locality: 'Ashgrove',
        state: 'QLD',
        postcode: '4060'
      }),
      notes: 'Home sweet home',
      valuations: [
        new Valuation({
          date: moment().subtract(3, 'years').format(DateFormat),
          amount: 52000000,
          note: 'Purchase price'
        }),
        new Valuation({
          date: moment().subtract(34, 'months').format(DateFormat),
          amount: 70500000,
          note: 'Sworn valuation'
        }),
        new Valuation({
          date: moment().add(2, 'weeks').format(DateFormat),
          amount: 180000000,
          note: 'Future fantasy'
        })
      ]
    })
    expect(getLastValuation(realEstate).amount).toEqual(70500000)
  })
})
