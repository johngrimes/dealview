import React from 'react'
import { shallow, mount } from 'enzyme'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import ValuationsInput from './ValuationsInput.js'
import DateStorageFormat from '../data/commonTypes'

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

  it('should be tolerant of a valuation with a undefined date', () => {
    const props = {
      name: 'value',
      valuations: [
        {
          amount: 350000,
          type: 'none',
        },
      ],
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    expect(wrapper.find(DatePicker).prop('selected')).toBe(undefined)
  })

  it('should display errors if touched', () => {
    const props = {
      name: 'someInput',
      errors: [ 'does not look right', 'smells funny' ],
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    wrapper.setState(
      {
        touched: true,
      },
      () => {
        expect(wrapper.find('.error')).toHaveLength(2)
        expect(wrapper.find('.errors')).toMatchSnapshot()
      }
    )
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
    wrapper.find('input[name="valuations-note-0"]').prop('onChange')({
      target: { value: 'Initial robbery' },
    })
    expect(props.onChange).toHaveBeenCalledWith(
      valuations.map((val, i) => {
        return i === 0 ? { ...val, note: 'Initial robbery' } : val
      })
    )
  })

  it('should call onFocus when an input is focused', () => {
    const props = {
      name: 'value',
      valuations,
      onFocus: jest.fn(),
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    wrapper.find('input[name="valuations-note-1"]').prop('onFocus')({
      target: { name: 'valuations-note-1' },
    })
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

  it('should not pass minimum date to purchase date picker', () => {
    const props = {
      name: 'value',
      minDate: moment('1983-06-21', DateStorageFormat),
      valuations: [
        {
          date: '1983-06-21',
          amount: 18700000,
          note: 'Initial purchase price',
          type: 'purchase',
        },
      ],
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    expect(wrapper.find(DatePicker).prop('minDate')).toBe(undefined)
  })

  it('should not pass maximum date to sale date picker', () => {
    const props = {
      name: 'value',
      maxDate: moment('2017-01-01'),
      valuations: [
        {
          date: '2017-01-01',
          amount: 340000,
          note: 'Sale price',
          type: 'sale',
        },
      ],
    }
    const wrapper = shallow(<ValuationsInput {...props} />)
    expect(wrapper.find(DatePicker).prop('maxDate')).toBe(undefined)
  })

  describe('validation', () => {
    it('should return an error when valuations share dates', () => {
      const valsWithDupe = valuations.concat(valuations[0])
      const result = ValuationsInput.validate(valsWithDupe)
      expect(result).toHaveLength(1)
      expect(result).toMatchSnapshot()
    })

    it('should return an error when a valuation does not have a date', () => {
      const valsNoDate = [
        {
          amount: 350000,
          type: 'none',
        },
      ]
      const result = ValuationsInput.validate(valsNoDate)
      expect(result).toHaveLength(1)
      expect(result).toMatchSnapshot()
    })

    it('should return an error when a valuation does not have an amount', () => {
      const valsNoAmount = [
        {
          date: '2023-03-04',
          type: 'none',
        },
      ]
      const result = ValuationsInput.validate(valsNoAmount)
      expect(result).toHaveLength(1)
      expect(result).toMatchSnapshot()
    })
  })
})
