import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { DateDisplayFormat, DateStorageFormat } from '../data/commonTypes.js'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import './styles/DateField.css'

class DateField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      touched: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(value) {
    this.setState(
      () => ({ value: value, touched: true }),
      () => {
        if (this.props.onChange) this.props.onChange(value)
      }
    )
  }

  handleFocus(event) {
    const target = event.target
    if (this.props.onFocus) {
      this.props.onFocus(target.name)
    }
  }

  componentWillReceiveProps(props) {
    this.setState(() => ({ value: props.value }))
  }

  render() {
    const {
      name,
      label,
      errors,
      forceErrorDisplay,
      minDate,
      maxDate,
    } = this.props
    const { value, touched } = this.state

    const labelTag = label
      ? <label htmlFor={name}>
          {label}
        </label>
      : null
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
    const inputClass = touched && errorTags.length > 0 ? 'with-errors' : ''
    let selected
    if (typeof value === 'string' && value.length > 0) {
      selected = moment(value, DateStorageFormat)
    } else if (value instanceof moment) {
      selected = value
    }

    return (
      <div className='control-group'>
        {labelTag}
        <div className='date-picker'>
          <DatePicker
            name={name}
            dateFormat={DateDisplayFormat}
            className={inputClass}
            selected={selected}
            showYearDropdown
            autoFocus={this.props.focus === name}
            onFocus={this.handleFocus}
            minDate={minDate}
            maxDate={maxDate}
            onChange={moment =>
              this.handleChange(moment.format(DateStorageFormat))}
          />
        </div>
        {(forceErrorDisplay || touched) &&
          errorTags.length > 0 &&
          <div className='errors'>
            {errorTags}
          </div>}
      </div>
    )
  }
}

export default DateField
