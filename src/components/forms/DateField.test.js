/* global expect */

import DateField from './DateField.js'

import React from 'react'
import { shallow } from 'enzyme'

describe('DateField', () => {
  it('should render', () => {
    const props = {
      name: 'someDate',
      value: '1981-07-26',
      label: 'Some Date'
    }
    const wrapper = shallow(<DateField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
