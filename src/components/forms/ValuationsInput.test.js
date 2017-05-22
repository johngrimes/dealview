/* global expect */

import ValuationsInput from 'components/forms/ValuationsInput.js'

import React from 'react'
import { shallow, mount } from 'enzyme'
import DatePicker from 'react-datepicker'

describe('ValuationsInput', () => {
  const valuations = [
    {
      date: '1983-06-21',
      amount: 18700000,
      note: 'Initial purchase price',
    },
    {
      date: '1992-03-15',
      amount: 36000000,
      note: 'Bank valuation - refinance',
    },
    {
      date: '2001-12-25',
      amount: 75000000,
      note: 'Sworn valuation',
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

  const fields = ['amount', 'note']
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
})
