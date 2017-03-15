// @flow

import React from 'react'

import * as Validations from '../../utils/FormValidation.js'
import type { AddressValues } from '../../data/commonTypes.js'
import type { FieldErrors } from '../../utils/FormValidation.js'

import './AddressField.css'

export type AddressErrors = {
  line1: FieldErrors,
  line2: FieldErrors,
  line3: FieldErrors
}

// Human-readable field labels.
const AddressLabels = {
  line1: 'Line 1',
  line2: 'Line 2',
  line3: 'Line 3',
  locality: 'Suburb / Town',
  state: 'State',
  postcode: 'Postcode'
}

export const AddressErrorDefaults = {
  line1: [],
  line2: [],
  line3: []
}

type Props = {
  name: string,
  value: AddressValues,
  errors?: AddressErrors,
  focus?: string,
  onChange?: (value: AddressValues) => void,
  onFocus?: (fieldName: string) => void
}

type State = {
  value: AddressValues,
  touched: boolean
}

class AddressField extends React.Component {
  props: Props
  state: State
  _refs: { [fieldName: string]: HTMLInputElement }
  handleChange: (fieldName: string, value: string) => void
  handleFocus: (event: Event) => true

  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.value,
      touched: false
    }

    this.handleChange = (fieldName, value) => {
      const updatedState = this.state.value
      updatedState[fieldName] = value
      this.setState({
        value: updatedState,
        touched: true
      })
      if (this.props.onChange) this.props.onChange(updatedState)
    }

    this.handleFocus = (event: Event) => {
      const target = event.target
      if (this.props.onFocus && target instanceof HTMLInputElement) {
        this.props.onFocus(target.name)
      }
      return true
    }

    this._refs = {}
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ value: props.value })
  }

  setFocus() {
    if (this.props.focus && this._refs[this.props.focus]) {
      this._refs[this.props.focus].focus()
    }
  }
  componentDidMount() { this.setFocus() }
  componentDidUpdate() { this.setFocus() }

  render() {
    // Create an array from any address field errors.
    const errorTags = []
    if (this.props.errors) {
      for (const fieldName in this.props.errors) {
        const fieldErrors = this.props.errors[fieldName]
        if (fieldErrors) {
          fieldErrors.forEach((msg, i) => {
            const labelledMessage = AddressLabels[fieldName] + ' ' + msg
            errorTags.push(<div key={fieldName + '-' + i} className='error'>{labelledMessage}</div>)
          })
        }
      }
    }

    const addressClass = this.state.touched && errorTags.length > 0
      ? 'address-field control-group with-errors'
      : 'address-field control-group'

    return (
      <div>
        <div className={addressClass}>
          <label htmlFor={this.props.name + '-line1'}>Address</label>
          <div className='group'>
            <input id={this.props.name + '-line1'} name={this.props.name + '-line1'} type='text'
              placeholder={AddressLabels.line1} value={this.state.value.line1}
              ref={input => this._refs[this.props.name + '-line2'] = input}
              onChange={(event) => this.handleChange('line1', event.target.value)}
              onFocus={this.handleFocus} />
            <input name={this.props.name + '-line2'} type='text'
              placeholder={AddressLabels.line2} value={this.state.value.line2}
              ref={input => this._refs[this.props.name + '-line2'] = input}
              onChange={(event) => this.handleChange('line2', event.target.value)}
              onFocus={this.handleFocus} />
            <input name={this.props.name + '-line3'} type='text'
              placeholder={AddressLabels.line3} value={this.state.value.line3}
              ref={input => this._refs[this.props.name + '-line3'] = input}
              onChange={(event) => this.handleChange('line3', event.target.value)}
              onFocus={this.handleFocus} />
            <input name={this.props.name + '-locality'} type='text'
              placeholder={AddressLabels.locality} value={this.state.value.locality}
              ref={input => this._refs[this.props.name + '-locality'] = input}
              onChange={(event) => this.handleChange('locality', event.target.value)}
              onFocus={this.handleFocus} />
          </div>
          {this.state.touched && errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
        </div>
        <input name={this.props.name + '-state'} type='hidden' value={this.state.value.state} />
        <input name={this.props.name + '-postcode'} type='hidden' value={this.state.value.postcode} />
      </div>
    )
  }

  static validate(values: AddressValues): AddressErrors {
    let errors = {}

    errors.line1 = []
    errors.line1 = errors.line1.concat(Validations.minLength(values.line1, 3))
    errors.line1 = errors.line1.concat(Validations.maxLength(values.line1, 100))

    errors.line2 = []
    errors.line2 = errors.line2.concat(Validations.minLength(values.line2, 3))
    errors.line2 = errors.line2.concat(Validations.maxLength(values.line2, 100))

    errors.line3 = []
    errors.line3 = errors.line3.concat(Validations.minLength(values.line3, 3))
    errors.line3 = errors.line3.concat(Validations.maxLength(values.line3, 100))

    return errors
  }
}

export default AddressField
