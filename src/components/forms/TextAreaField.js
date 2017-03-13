// @flow

import React from 'react'

import type { FieldErrors } from '../../utils/FormValidation.js'

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  errors?: FieldErrors,
  forceErrorDisplay?: boolean,
  focus?: string,
  onChange?: (value: string) => void,
  onFocus?: (fieldName: string) => void
}

type State = {
  value: string,
  touched: boolean
}

class TextAreaField extends React.Component {
  props: Props
  state: State
  ref: HTMLTextAreaElement
  handleChange: (event: Event) => true
  handleFocus: (event: Event) => true

  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.value,
      touched: false
    }

    this.handleChange = (event) => {
      const target = event.target
      if (target instanceof HTMLTextAreaElement) {
        this.setState({
          value: target.value,
          touched: true
        })
        if (this.props.onChange) this.props.onChange(target.value)
      }
      return true
    }

    this.handleFocus = (event) => {
      const target = event.target
      if (this.props.onFocus && target instanceof HTMLTextAreaElement) {
        this.props.onFocus(target.name)
      }
      return true
    }
  }

  setFocus() {
    if (this.props.focus === this.props.name) {
      this.ref.focus()
    }
  }
  componentDidMount() { this.setFocus() }
  componentDidUpdate() { this.setFocus() }

  render() {
    const labelTag = this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null

    const errorTags = []
    if (this.props.errors) {
      this.props.errors.forEach((msg, i) =>
        errorTags.push(<div key={i} className='error'>{msg}</div>)
      )
    }

    const inputClass = this.state.touched && errorTags.length > 0
      ? 'with-errors'
      : ''

    return <div className='control-group'>
             {labelTag}
             <textarea name={this.props.name} className={inputClass} placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange} onFocus={this.handleFocus} ref={input => this.ref = input} />
             {(this.props.forceErrorDisplay || this.state.touched) && errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
           </div>
  }
}

export default TextAreaField
