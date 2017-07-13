import React from 'react'
import { shallow, mount } from 'enzyme'

import SelectField from './SelectField.js'

describe('SelectField', () => {
  const minProps = {
    name: 'someInput',
    options: [ [ 'Something', 'something' ], [ 'Something Else', 'something-else' ] ],
  }

  it('should render', () => {
    const props = {
      ...minProps,
      value: 'something',
      label: 'Some Input',
    }
    const wrapper = shallow(<SelectField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should be tolerant of an undefined value prop', () => {
    const props = minProps
    const wrapper = shallow(<SelectField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should display errors if touched', () => {
    const props = {
      ...minProps,
      errors: [ 'does not look right', 'smells funny' ],
    }
    const wrapper = shallow(<SelectField {...props} />)
    return new Promise(resolve =>
      wrapper.setState(
        () => ({ value: 'something', touched: true }),
        () => resolve()
      )
    ).then(() => {
      expect(wrapper.find('.error')).toHaveLength(2)
      expect(wrapper).toMatchSnapshot()
    })
  })

  it('should not display errors if not touched', () => {
    const props = {
      ...minProps,
      errors: [ 'does not look right', 'smells funny' ],
    }
    const wrapper = shallow(<SelectField {...props} />)
    expect(wrapper.find('.error')).toHaveLength(0)
  })

  it('should display errors if not touched but forceErrorDisplay is true', () => {
    const props = {
      ...minProps,
      errors: [ 'does not look right', 'smells funny' ],
      forceErrorDisplay: true,
    }
    const wrapper = shallow(<SelectField {...props} />)
    expect(wrapper.find('.error')).toHaveLength(2)
  })

  it('should call onChange when the input changes', () => {
    const props = {
      ...minProps,
      onChange: jest.fn(),
    }
    const wrapper = shallow(<SelectField {...props} />)
    wrapper.find('select').prop('onChange')({ target: { value: 'something' } })
    expect(props.onChange).toHaveBeenCalledWith('something')
  })

  it('should call onFocus when the input is focused', () => {
    const props = {
      ...minProps,
      onFocus: jest.fn(),
    }
    const wrapper = shallow(<SelectField {...props} />)
    wrapper.find('select').prop('onFocus')({ target: { name: 'someInput' } })
    expect(props.onFocus).toHaveBeenCalledWith('someInput')
  })

  it('should focus the input when the focus prop is passed', () => {
    const props = minProps
    const wrapper = mount(<SelectField {...props} />)
    const spy = jest.spyOn(wrapper.find('select').getNode(), 'focus')
    wrapper.setProps({ focus: 'someInput' })
    expect(spy).toHaveBeenCalled()
  })
})
