// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import type { Moment } from 'moment'

import { DateDisplayFormat, DateStorageFormat } from 'types/commonTypes'
import type { FieldErrors } from 'utils/FormValidation'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'

type Props = {
  +name: string,
  +value?: string | Moment,
  +label?: string,
  +errors?: FieldErrors,
  +forceErrorDisplay?: boolean,
  +focus?: string,
  +onChange?: (value: string) => void,
  +onFocus?: (fieldName: string) => void
}

type State = {
  +value?: string,
  +touched: boolean
}

class DateField extends React.Component {
  props: Props
  state: State
  handleChange: (value: string) => void
  handleFocus: (event: { target: { name: string } }) => void

  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.value,
      touched: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(value: string): void {
    this.setState(
      () => ({ value: value, touched: true }),
      () => { if (this.props.onChange) this.props.onChange(value) }
    )
  }

  handleFocus(event: { target: { name: string } }): void {
    const target = event.target
    if (this.props.onFocus) {
      this.props.onFocus(target.name)
    }
  }

  componentWillReceiveProps(props: Props) {
    this.setState(() => ({ value: props.value }))
  }

  render() {
    const { name, label, errors, forceErrorDisplay } = this.props
    const { value, touched } = this.state
    const labelTag = label ? <label htmlFor={name}>{label}</label> : null
    const errorTags = []
    if (errors) {
      errors.forEach((msg, i) =>
        errorTags.push(<div key={i} className='error'>{msg}</div>)
      )
    }
    const inputClass = touched && errorTags.length > 0
      ? 'with-errors'
      : ''
    let selected
    if (typeof value === 'string' && value.length > 0) {
      selected = moment(value, DateStorageFormat)
    } else if (value instanceof moment) {
      selected = value
    }

    return (
      <div className='control-group'>
        {labelTag}
        <DatePicker name={name} dateFormat={DateDisplayFormat}
          className={inputClass}
          selected={selected} showYearDropdown
          autoFocus={this.props.focus === name}
          onFocus={this.handleFocus}
          onChange={(moment) => this.handleChange(moment.format(DateStorageFormat))} />
        {(forceErrorDisplay || touched) && errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
      </div>
    )
  }
}

export default DateField
