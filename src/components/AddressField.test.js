import React from 'react'
import { shallow, mount } from 'enzyme'

import AddressField from './AddressField'
import { validAddress1 } from '../data/fixtures/commonTypes'

describe('AddressField', () => {
  it('should render', () => {
    const props = {
      name: 'someInput',
      address: validAddress1,
    }
    const wrapper = shallow(<AddressField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should display errors if touched', () => {
    const props = {
      name: 'someInput',
      address: validAddress1,
      errors: {
        line1: ['does not comply with the standard'],
        line2: ['is too long'],
      },
    }
    const wrapper = shallow(<AddressField {...props} />)
    wrapper.setState(
      {
        value: 'something',
        touched: ['line1'],
      },
      () => {
        expect(wrapper.find('.error')).toHaveLength(1)
        expect(wrapper).toMatchSnapshot()
      }
    )
  })

  it('should display errors if not touched but forceErrorDisplay is true', () => {
    const props = {
      name: 'someInput',
      address: validAddress1,
      errors: {
        line1: ['does not comply with the standard'],
        line2: ['is too long'],
      },
      forceErrorDisplay: true,
    }
    const wrapper = shallow(<AddressField {...props} />)
    expect(wrapper.find('.error')).toHaveLength(2)
  })

  it('should call onChange when an input changes', () => {
    const props = {
      name: 'someInput',
      address: validAddress1,
      onChange: jest.fn(),
    }
    const wrapper = shallow(<AddressField {...props} />)
    wrapper.find('input[name="someInput-line3"]').prop('onChange')({
      target: { value: 'something' },
    })
    expect(props.onChange).toHaveBeenCalledWith({
      ...validAddress1,
      line3: 'something',
    })
  })

  it('should call onFocus when the input is focused', () => {
    const props = {
      name: 'someInput',
      address: validAddress1,
      onFocus: jest.fn(),
    }
    const wrapper = shallow(<AddressField {...props} />)
    wrapper.find('input[name="someInput-locality"]').prop('onFocus')({
      target: { name: 'someInput-locality' },
    })
    expect(props.onFocus).toHaveBeenCalledWith('someInput-locality')
  })

  it('should focus a field when the focus prop is passed', () => {
    const props = {
      name: 'someInput',
      address: validAddress1,
    }
    const wrapper = mount(<AddressField {...props} />)
    const spy = jest.spyOn(
      wrapper.find('input[name="someInput-line1"]').getNode(),
      'focus'
    )
    wrapper.setProps({ focus: 'someInput-line1' })
    expect(spy).toHaveBeenCalled()
  })
})
