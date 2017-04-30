// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { DateFormat } from '../../data/commonTypes.js'
import type { FieldErrors } from '../../utils/FormValidation.js'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'

type Props = {
  name: string,
  value?: string,
  label?: string,
  errors?: FieldErrors,
  forceErrorDisplay?: boolean,
  focus?: string,
  onChange?: (value: string) => void,
  onFocus?: (fieldName: string) => void
}

type State = {
  value?: string,
  touched: boolean
}

class DateField extends React.Component {
  props: Props
  state: State
  ref: HTMLInputElement
  handleChange: (value: string) => void
  handleFocus: (event: { target: { name: string } }) => void

  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.value,
      touched: false
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
    const selected = (typeof value === 'string')
      ? moment(value, DateFormat)
      : undefined

    return (
      <div className='control-group'>
        {labelTag}
        <DatePicker name={name} dateFormat={DateFormat}
          className={inputClass} ref={input => this.ref = input}
          selected={selected} showYearDropdown
          autoFocus={this.props.focus === name}
          onFocus={this.handleFocus}
          onChange={(moment) => this.handleChange(moment.format(DateFormat))} />
        {(forceErrorDisplay || touched) && errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
      </div>
    )
  }
}

export default DateField
