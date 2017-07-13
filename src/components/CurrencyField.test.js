import React from 'react'
import { shallow } from 'enzyme'

import CurrencyField from './CurrencyField.js'

describe('CurrencyField', () => {
  const minProps = {
    name: 'someInput',
  }

  it('should render', () => {
    const props = {
      ...minProps,
      value: '123456',
    }
    const wrapper = shallow(<CurrencyField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
