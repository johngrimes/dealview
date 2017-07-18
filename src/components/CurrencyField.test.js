import React from 'react'
import { shallow } from 'enzyme'

import CurrencyField from './CurrencyField.js'
import InputField from './InputField.js'

describe('CurrencyField', () => {
  const minProps = {
    name: 'someInput',
  }

  it('should render its value correctly', () => {
    const props = {
      ...minProps,
      value: '123456',
    }
    const wrapper = shallow(<CurrencyField {...props} />)
    expect(wrapper).toMatchSnapshot()
    const fieldWrapper = wrapper.find(InputField).first()
    expect(fieldWrapper.prop('value')).toBe('$123,456')
  })

  it('should update and notify upon change', () => {
    const props = { ...minProps, onChange: jest.fn() }
    const wrapper = shallow(<CurrencyField {...props} />)
    wrapper.find(InputField).prop('onChange')('$1,0003')
    expect(wrapper.find(InputField).prop('value')).toBe('$10,003')
    expect(props.onChange).toHaveBeenCalledWith('10003')
  })

  it('should update upon props update', () => {
    const props = { ...minProps }
    const wrapper = shallow(<CurrencyField {...props} />)
    wrapper.setProps({ value: '1250' })
    expect(wrapper.find(InputField).prop('value')).toBe('$1,250')
  })
})
