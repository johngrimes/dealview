import React from 'react'
import { shallow, mount } from 'enzyme'

import InputField from './InputField.js'

describe('InputField', () => {
  it('should render', () => {
    const props = {
      name: 'someInput',
      type: 'text',
      value: 'something',
      label: 'Some Input',
      placeholder: 'Type here...',
    }
    const wrapper = shallow(<InputField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should be tolerant of an undefined value prop', () => {
    const props = {
      name: 'someInput',
      type: 'text',
      label: 'Some Input',
      placeholder: 'Type here...',
    }
    const wrapper = shallow(<InputField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should display errors if touched', () => {
    const props = {
      name: 'someInput',
      type: 'text',
      errors: [ 'does not look right', 'smells funny' ],
    }
    const wrapper = shallow(<InputField {...props} />)
    wrapper.setState(
      {
        value: 'something',
        touched: true,
      },
      () => {
        expect(wrapper.find('.error')).toHaveLength(2)
        expect(wrapper).toMatchSnapshot()
      }
    )
  })

  it('should not display errors if not touched', () => {
    const props = {
      name: 'someInput',
      type: 'text',
      errors: [ 'does not look right', 'smells funny' ],
    }
    const wrapper = shallow(<InputField {...props} />)
    expect(wrapper.find('.error')).toHaveLength(0)
  })

  it('should display errors if not touched but forceErrorDisplay is true', () => {
    const props = {
      name: 'someInput',
      type: 'text',
      errors: [ 'does not look right', 'smells funny' ],
      forceErrorDisplay: true,
    }
    const wrapper = shallow(<InputField {...props} />)
    expect(wrapper.find('.error')).toHaveLength(2)
  })

  it('should call onChange when the input changes', () => {
    const props = {
      name: 'someInput',
      type: 'text',
      onChange: jest.fn(),
    }
    const wrapper = shallow(<InputField {...props} />)
    wrapper.find('input').prop('onChange')({ target: { value: 'something' } })
    expect(props.onChange).toHaveBeenCalledWith('something', undefined)
  })

  it('should call onFocus when the input is focused', () => {
    const props = {
      name: 'someInput',
      type: 'text',
      onFocus: jest.fn(),
    }
    const wrapper = shallow(<InputField {...props} />)
    wrapper.find('input').prop('onFocus')({ target: { name: 'someInput' } })
    expect(props.onFocus).toHaveBeenCalledWith('someInput')
  })

  it('should focus the input when the focus prop is passed', () => {
    const props = {
      name: 'someInput',
      type: 'text',
    }
    const wrapper = mount(<InputField {...props} />)
    const spy = jest.spyOn(wrapper.find('input').getNode(), 'focus')
    wrapper.setProps({ focus: 'someInput' })
    expect(spy).toHaveBeenCalled()
  })
})
