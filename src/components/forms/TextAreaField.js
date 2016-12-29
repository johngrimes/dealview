// @flow

import React from 'react'

import type { FieldErrors } from '../../utils/FormValidation.js'

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  errors?: FieldErrors,
  notifyChange?: (value: string) => void
}

type State = {
  value: string,
  touched: boolean
}

class TextAreaField extends React.Component {
  props: Props
  state: State
  handleChange: (event: Event) => true

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
        if (this.props.notifyChange) this.props.notifyChange(target.value)
      }
      return true
    }
  }

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
             <textarea id={this.props.name} className={inputClass} placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange} />
             {this.state.touched && errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
           </div>
  }
}

export default TextAreaField
