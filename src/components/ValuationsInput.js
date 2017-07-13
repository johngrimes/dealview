import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import _ from 'lodash'

import HiddenField from './HiddenField.js'
import { DateDisplayFormat, DateStorageFormat } from '../data/commonTypes.js'
import { ValuationDefault, compareValuationsByDate } from '../data/valuations.js'
import * as Validations from '../utils/formValidation.js'

import './styles/ValuationsInput.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

class ValuationsInput extends React.Component {
  constructor(props) {
    super(props)
    const valuations = this.props.valuations
      ? this.props.valuations.sort(compareValuationsByDate)
      : this.props.valuations
    this.state = {
      valuations,
      touched: false,
    }
    this._refs = {}

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleAddValuation = this.handleAddValuation.bind(this)
  }

  handleChange(i, field, value) {
    if (this.state.valuations === undefined) return
    this.setState(
      prevState => {
        const updatedValuations = prevState.valuations.slice()
        updatedValuations[i] = { ...updatedValuations[i], [field]: value }
        return {
          ...prevState,
          valuations: updatedValuations,
          touched: true,
        }
      },
      () => {
        if (this.state.valuations && this.props.onChange) {
          this.props.onChange(this.state.valuations)
        }
      }
    )
  }

  handleAddValuation() {
    const updatedValuations = this.state.valuations ? this.state.valuations.concat([ValuationDefault]) : []
    this.setState(
      () => ({ valuations: updatedValuations }),
      () => {
        if (this.props.onChange) this.props.onChange(updatedValuations)
      }
    )
  }

  handleDeleteValuation(index) {
    this.setState(
      prevState => ({
        valuations: prevState.valuations.filter((_, i) => i !== index),
      }),
      () => {
        if (this.props.onChange && this.state.valuations) {
          this.props.onChange(this.state.valuations)
        }
      }
    )
  }

  handleFocus(event) {
    const target = event.target
    if (this.props.onFocus) {
      this.props.onFocus(target.name)
    }
  }

  setFocus() {
    if (this.props.focus && this._refs[this.props.focus]) {
      this._refs[this.props.focus].focus()
    }
  }

  handleBlur(event) {
    if (event.relatedTarget && !event.relatedTarget.name.match(`^${this.props.name}`)) {
      this.setState(prevState => ({
        valuations: prevState.valuations.sort(compareValuationsByDate),
      }))
    }
  }

  componentWillReceiveProps(props) {
    if (props.valuations) {
      const sortedValuations = props.valuations.sort(compareValuationsByDate)
      this.setState(() => ({ valuations: sortedValuations }))
    }
  }

  componentDidMount() {
    this.setFocus()
  }

  componentDidUpdate() {
    this.setFocus()
  }

  render() {
    const { errors, forceErrorDisplay, minDate, maxDate } = this.props
    const { touched } = this.state
    const valuations =
      this.state.valuations === undefined
        ? []
        : this.state.valuations.map((v, i) => {
          return (
              <tr key={i} className={v.type && v.type !== 'none' ? `valuation valuation-${v.type}` : 'valuation'}>
                <td className='valuations-date'>
                  <DatePicker
                    name={`valuations-date-${i}`}
                    dateFormat={DateDisplayFormat}
                    selected={v.date ? moment(v.date, DateStorageFormat) : undefined}
                    showYearDropdown
                    minDate={v.type !== 'purchase' ? minDate : undefined}
                    maxDate={v.type !== 'sale' ? maxDate : undefined}
                    autoFocus={this.props.focus === `valuations-date-${i}`}
                    onChange={moment => this.handleChange(i, 'date', moment.format(DateStorageFormat))}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                </td>
                <td className='valuations-amount'>
                  <input
                    name={`valuations-amount-${i}`}
                    type='number'
                    min='1'
                    value={v.amount ? v.amount.toString() : ''}
                    placeholder='Value'
                    onChange={event => this.handleChange(i, 'amount', parseInt(event.target.value, 10))}
                    ref={input => (this._refs[`valuations-amount-${i}`] = input)}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                </td>
                <td className='valuations-note'>
                  <input
                    name={`valuations-note-${i}`}
                    type='text'
                    value={v.note}
                    placeholder='Note'
                    onChange={event => this.handleChange(i, 'note', event.target.value)}
                    ref={input => (this._refs[`valuations-note-${i}`] = input)}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                  <HiddenField name={`valuations-type-${i}`} type='hidden' value={v.type} />
                </td>
                <td className='valuations-delete'>
                  <button
                    className='delete-valuation-button'
                    type='button'
                    onClick={() => this.handleDeleteValuation(i)}
                  />
                </td>
              </tr>
          )
        })
    const errorTags = []
    if (errors) {
      errors.forEach((msg, i) =>
        errorTags.push(
          <div key={i} className='error'>
            {msg}
          </div>
        )
      )
    }

    return (
      <div className='valuations-input control-group'>
        <table className='valuations table'>
          <tbody>
            {valuations}
          </tbody>
        </table>
        {(forceErrorDisplay || touched) &&
          errorTags.length > 0 &&
          <div className='errors'>
            {errorTags}
          </div>}
        <button className='button add-valuation-button' type='button' onClick={this.handleAddValuation}>
          +&nbsp;&nbsp;Add
        </button>
      </div>
    )
  }

  static validate(valuations) {
    return []
      .concat(ValuationsInput.valuationsHaveDates(valuations))
      .concat(ValuationsInput.valuationsHaveAmounts(valuations))
      .concat(ValuationsInput.valuationsDontShareDates(valuations))
  }

  static valuationsHaveDates(valuations) {
    return Validations.validate(valuations, vals => vals.every(v => v.date), 'Valuations must all have dates')
  }

  static valuationsHaveAmounts(valuations) {
    return Validations.validate(valuations, vals => vals.every(v => v.amount), 'Valuations must all have amounts')
  }

  static valuationsDontShareDates(valuations) {
    return Validations.validate(
      valuations,
      vals => {
        const valsWithDates = vals.filter(v => v.date)
        return valsWithDates.length === _.uniq(valsWithDates.map(v => v.date)).length
      },
      'Valuations must all be on different dates'
    )
  }
}

export default ValuationsInput
