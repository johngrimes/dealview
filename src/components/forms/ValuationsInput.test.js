/* global expect */

import ValuationsInput from './ValuationsInput.js'

import React from 'react'
import { shallow } from 'enzyme'

describe('ValuationsInput', () => {
  it('should render', () => {
    const valuations = [
      {
        date: '1983-06-21',
        amount: 18700000,
        note: 'Initial purchase price'
      },
      {
        date: '1992-03-15',
        amount: 36000000,
        note: 'Bank valuation - refinance'
      },
      {
        date: '2001-12-25',
        amount: 75000000,
        note: 'Sworn valuation'
      }
    ]
    const handleChange = valuations => { console.log(valuations) }
    const wrapper = shallow(
      <ValuationsInput name='value' value={valuations} notifyChange={handleChange} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
