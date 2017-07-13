import moment from 'moment'
import _ from 'lodash'

import { getValuationAtDate } from './asset.js'
import { DateStorageFormat } from './commonTypes.js'

describe('getValuationAtDate', () => {
  const asset = {
    startDate: '2014-05-03',
    valuations: [
      {
        date: '2014-05-03',
        amount: 520000,
        note: 'Purchase price',
      },
      {
        date: '2014-07-03',
        amount: 705000,
        note: 'Sworn valuation',
      },
      {
        date: '2017-05-17',
        amount: 1800000,
        note: 'Future fantasy',
      },
    ],
  }

  it('should get the correct valuation', () => {
    let valuation = getValuationAtDate(asset, moment('2017-05-03', DateStorageFormat))
    expect(valuation).toEqual(705000)
    valuation = getValuationAtDate(asset, moment('2014-06-03', DateStorageFormat))
    expect(valuation).toEqual(520000)
  })

  it('should recognise a valuation on the day it is effective', () => {
    const valuation = getValuationAtDate(asset, moment('2014-07-03', DateStorageFormat))
    expect(valuation).toEqual(705000)
  })

  it('should return zero if selected date is before start date', () => {
    const valuation = getValuationAtDate(asset, moment('1988-04-13', DateStorageFormat))
    expect(valuation).toEqual(0)
  })

  it('should return zero if selected date is after end date', () => {
    const assetWithEndDate = { ...asset, endDate: '2019-02-05' }
    const valuation = getValuationAtDate(assetWithEndDate, moment('2025-01-01', DateStorageFormat))
    expect(valuation).toEqual(0)
  })

  it('should return zero if there are no valuations', () => {
    const assetWithoutValuations = _.omit(asset, 'valuations')
    const valuation = getValuationAtDate(assetWithoutValuations, moment('2017-05-03'))
    expect(valuation).toEqual(0)
  })

  it('should return zero if the query date falls between the start date and first valuation', () => {
    const asset = {
      id: 7,
      instanceId: '7',
      name: 'Cartel',
      startDate: '2017-02-26',
      type: 'RealEstate',
      valuations: [
        {
          amount: 235,
          date: '2017-05-25',
          note: '',
        },
      ],
    }
    const valuation = getValuationAtDate(asset, moment('2017-05-05', DateStorageFormat))
    expect(valuation).toEqual(0)
  })
})
