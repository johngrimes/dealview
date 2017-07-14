import React from 'react'
import { shallow } from 'enzyme'

import CurrencyField from './CurrencyField.js'
import InputField from './InputField.js'

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

  it('should update state on change', () => {
    const props = { ...minProps }
    const wrapper = shallow(<CurrencyField {...props} />)
    wrapper.find(InputField).prop('onChange')('$1,0003')
    expect(wrapper.state('value')).toBe(10003)
    expect(wrapper.find(InputField).prop('value')).toBe('$10,003')
  })

  it('should update state on props update', () => {
    const props = { ...minProps }
    const wrapper = shallow(<CurrencyField {...props} />)
    wrapper.setProps({ value: '1250' })
    expect(wrapper.state('value')).toBe(1250)
    expect(wrapper.find(InputField).prop('value')).toBe('$1,250')
  })
})
