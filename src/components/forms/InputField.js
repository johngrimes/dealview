// @flow

import React from 'react'

import type { FieldErrors } from 'utils/FormValidation'

type Props = {
  +name: string,
  +type: 'hidden'|'text'|'search'|'tel'|'url'|'email'|
         'password'|'date'|'month'|'week'|'time'|'datetime-local'|
         'number'|'range'|'color'|'checkbox'|'radio'|'file'|
         'submit'|'image'|'reset'|'button',
  +value?: string,
  +label?: string,
  +placeholder?: string,
  +errors?: FieldErrors,
  +forceErrorDisplay?: boolean,
  +focus?: string,
  +onChange?: (value: string) => void,
  +onFocus?: (fieldName: string) => void,
}

type State = {
  +value?: string,
  +touched: boolean,
}

class InputField extends React.Component {
  props: Props
  state: State
  ref: { focus: () => void }
  handleChange: (event: { target: { value: string } }) => void
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

  handleChange(event: { target: { value: string } }): void {
    const target = event.target
    this.setState(
      () => ({ value: target.value, touched: true }),
      () => { if (this.props.onChange) this.props.onChange(target.value) }
    )
  }

  handleFocus(event: { target: { name: string } }): void {
    const target = event.target
    if (this.props.onFocus) {
      this.props.onFocus(target.name)
    }
  }

  setFocus() {
    if (this.props.focus === this.props.name) {
      this.ref.focus()
    }
  }

  componentWillReceiveProps(props: Props) {
    this.setState(() => ({ value: props.value }))
  }

  componentDidMount() { this.setFocus() }

  componentDidUpdate() { this.setFocus() }

  render() {
    const { name, type, label, placeholder, errors, forceErrorDisplay } = this.props
    const { value, touched } = this.state
    const labelTag = label
      ? <label htmlFor={name}>{label}</label>
      : null
    const errorTags = []
    if (errors) {
      errors.forEach((msg, i) =>
        errorTags.push(<div key={i} className='error'>{msg}</div>)
      )
    }
    const className = touched && errorTags.length > 0
      ? 'with-errors'
      : ''
    const props = {
      name, className, type, placeholder, value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      ref: input => this.ref = input,
    }

    return (
      <div className='control-group'>
        {labelTag}
        <input {...props} />
        {(forceErrorDisplay || touched) &&
          errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
      </div>
    )
  }
}

export default InputField
