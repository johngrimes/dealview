// @flow

import React from 'react'

import type { FieldErrors } from 'utils/FormValidation'

type SelectOption = [string, string]  // [label, value]
type SelectOptions = Array<SelectOption>

type Props = {
  +name: string,
  +options: SelectOptions,
  +value?: string,
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

class SelectField extends React.Component {
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

  componentWillReceiveProps(props: Props) {
    this.setState(() => ({ value: props.value }))
  }

  setFocus() {
    if (this.props.focus === this.props.name) {
      this.ref.focus()
    }
  }
  componentDidMount() { this.setFocus() }
  componentDidUpdate() { this.setFocus() }

  render() {
    const { name, options, label, errors, forceErrorDisplay } = this.props
    const { value, touched } = this.state
    const optionTags = options.map(option => {
      const props = {
        label: option[0],
        value: option[1],
        selected: option[1] === value,
      }
      return <option {...props} />
    })
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
      name, className,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      ref: input => this.ref = input,
    }

    return (
      <div className='control-group'>
        {labelTag}
        <select {...props}>{optionTags}</select>
        {(forceErrorDisplay || touched) &&
          errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
      </div>
    )
  }
}

export default SelectField
