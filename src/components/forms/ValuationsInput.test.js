/* global expect */

import ValuationsInput from 'components/forms/ValuationsInput'

import React from 'react'
import { shallow, mount } from 'enzyme'
import DatePicker from 'react-datepicker'

describe('ValuationsInput', () => {
  const valuations = [
    {
      date: '1983-06-21',
      amount: 18700000,
      note: 'Initial purchase price',
      type: 'purchase',
    },
    {
      date: '1992-03-15',
      amount: 36000000,
      note: 'Bank valuation - refinance',
      type: 'none',
    },
    {
      date: '2001-12-25',
      amount: 75000000,
      note: 'Sworn valuation',
      type: 'none',
    },
  ]

  it('should render', () => {
    const props = {
      name: 'value',
      valuations,
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should be tolerant of an undefined valuations prop', () => {
    const props = {
      name: 'value',
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should display errors if touched', () => {
    const props = {
      name: 'someInput',
      errors: [ 'does not look right', 'smells funny' ],
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    wrapper.setState({
      touched: true,
    }, () => {
      expect(wrapper.find('.error')).toHaveLength(2)
      expect(wrapper.find('.errors')).toMatchSnapshot()
    })
  })

  it('should not display errors if not touched', () => {
    const props = {
      name: 'someInput',
      errors: [ 'does not look right', 'smells funny' ],
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    expect(wrapper.find('.error')).toHaveLength(0)
  })

  it('should call onChange when an input changes', () => {
    const props = {
      name: 'value',
      valuations,
      onChange: jest.fn(),
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    wrapper.find('input[name="valuations-note-0"]').prop('onChange')({ target: { value: 'Initial robbery' } })
    expect(props.onChange).toHaveBeenCalledWith(valuations.map((val, i) => {
      return (i === 0)
        ? { ...val, note: 'Initial robbery' }
        : val
    }))
  })

  it('should call onFocus when an input is focused', () => {
    const props = {
      name: 'value',
      valuations,
      onFocus: jest.fn(),
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    wrapper.find('input[name="valuations-note-1"]').prop('onFocus')({ target: { name: 'valuations-note-1' } })
    expect(props.onFocus).toHaveBeenCalledWith('valuations-note-1')
  })

  it('should focus a date input when the focus prop is passed', () => {
    const props = {
      name: 'value',
      valuations,
      focus: 'valuations-date-0',
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    expect(wrapper.find(DatePicker).first().prop('autoFocus')).toBe(true)
  })

  const fields = [ 'amount', 'note' ]
  fields.forEach(field => {
    it(`should focus an ${field} input when the focus prop is passed`, () => {
      const props = {
        name: 'value',
        valuations,
      }
      const wrapper = mount(<ValuationsInput {...props} />)
      const spy = jest.spyOn(
        wrapper.find(`input[name="valuations-${field}-0"]`).getNode(),
        'focus'
      )
      wrapper.setProps({ focus: `valuations-${field}-0` })
      expect(spy).toHaveBeenCalled()
    })
  })

  it('should add a new valuation', () => {
    const props = {
      name: 'value',
      valuations,
    }
    const numValuations = valuations.length
    const wrapper = shallow(<ValuationsInput {...props} />)
    wrapper.find('.add-valuation-button').simulate('click')
    expect(wrapper.state('valuations')).toHaveLength(numValuations + 1)
  })

  it('should delete a valuation', () => {
    const props = {
      name: 'value',
      valuations,
    }
    const numValuations = valuations.length
    const wrapper = shallow(<ValuationsInput {...props} />)
    wrapper.find('.delete-valuation-button').first().simulate('click')
    expect(wrapper.state('valuations')).toHaveLength(numValuations - 1)
  })

  describe('validation', () => {
    it('should return an error when valuations share dates', () => {
      const valsWithDupe = valuations.concat(valuations[0])
      const result = ValuationsInput.validate(valsWithDupe)
      expect(result).toHaveLength(1)
      expect(result).toMatchSnapshot()
    })
  })
})
