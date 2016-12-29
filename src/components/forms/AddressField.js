// @flow

import React from 'react'

import * as Validations from '../../utils/FormValidation.js'
import type { FieldErrors } from '../../utils/FormValidation.js'

import './AddressField.css'

export type AddressValues = {
  address1: string,
  address2: string,
  address3: string,
  locality: string,
  state: string,
  postcode: string
}

export type AddressErrors = {
  address1: FieldErrors,
  address2: FieldErrors,
  address3: FieldErrors
}

// Human-readable field labels.
const AddressLabels = {
  address1: 'Line 1',
  address2: 'Line 2',
  address3: 'Line 3',
  locality: 'Suburb / Town',
  state: 'State',
  postcode: 'Postcode'
}

export const AddressDefaults = {
  address1: '',
  address2: '',
  address3: '',
  locality: '',
  state: '',
  postcode: ''
}

export const AddressErrorDefaults = {
  address1: [],
  address2: [],
  address3: []
}

type Props = {
  name: string,
  value: AddressValues,
  errors?: AddressErrors,
  notifyChange?: (value: AddressValues) => void
}

type State = {
  value: AddressValues,
  touched: boolean
}

class AddressField extends React.Component {
  props: Props
  state: State
  handleChange: (fieldName: string, value: string) => void

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
      if (this.props.notifyChange) this.props.notifyChange(updatedState)
    }
  }

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
          <label htmlFor='address1'>Address</label>
          <div className='group'>
            <input id={this.props.name + '-address1'} name='address1' type='text' placeholder={AddressLabels.address1} value={this.state.value.address1}
              onChange={(event) => this.handleChange('address1', event.target.value)} />
            <input id={this.props.name + '-address2'} name='address2' type='text' placeholder={AddressLabels.address2} value={this.state.value.address2}
              onChange={(event) => this.handleChange('address2', event.target.value)} />
            <input id={this.props.name + '-address3'} name='address3' type='text' placeholder={AddressLabels.address3} value={this.state.value.address3}
              onChange={(event) => this.handleChange('address3', event.target.value)} />
            <input id={this.props.name + '-locality'} name='locality' type='text' placeholder={AddressLabels.locality} value={this.state.value.locality}
              onChange={(event) => this.handleChange('locality', event.target.value)} />
          </div>
          {this.state.touched && errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
        </div>
        <input id={this.props.name + '-state'} name='state' type='hidden' value={this.state.value.state} />
        <input id={this.props.name + '-postcode'} name='postcode' type='hidden' value={this.state.value.postcode} />
      </div>
    )
  }

  static validate(values: AddressValues): AddressErrors {
    let errors = {}

    errors.address1 = []
    errors.address1 = errors.address1.concat(Validations.minLength(values.address1, 3))
    errors.address1 = errors.address1.concat(Validations.maxLength(values.address1, 100))

    errors.address2 = []
    errors.address2 = errors.address2.concat(Validations.minLength(values.address2, 3))
    errors.address2 = errors.address2.concat(Validations.maxLength(values.address2, 100))

    errors.address3 = []
    errors.address3 = errors.address3.concat(Validations.minLength(values.address3, 3))
    errors.address3 = errors.address3.concat(Validations.maxLength(values.address3, 100))

    return errors
  }
}

export default AddressField
