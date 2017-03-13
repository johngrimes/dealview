// @flow

import React from 'react'

import EventPublisher from '../../../data/events/EventPublisher.js'
import InputField from '../../forms/InputField.js'
import HiddenField from '../../forms/HiddenField.js'
import AddressField, { AddressErrorDefaults } from '../../forms/AddressField.js'
import TextAreaField from '../../forms/TextAreaField.js'
import ValuationsInput from '../../forms/ValuationsInput.js'
import * as Validations from '../../../utils/FormValidation.js'
import { save } from '../../../data/assets/realEstate.js'
import { RealEstateEmpty } from '../../../data/assets/realEstate.js'
import type { RealEstateValues } from '../../../data/assets/realEstate.js'
import type { AddressValues } from '../../../data/commonTypes.js'
import type { Valuations } from '../../../components/forms/ValuationsInput.js'
import type { FieldErrors } from '../../../utils/FormValidation.js'
import type { AddressErrors } from '../../../components/forms/AddressField.js'

import '../../../styles/forms.css'
import '../../../styles/buttons.css'
import '../../../styles/tables.css'
import './RealEstateForm.css'

export type RealEstateErrors = {
  name: FieldErrors,
  address: AddressErrors,
  notes: FieldErrors
}

type Props = {
  eventPublisher?: EventPublisher
}

type State = {
  values: RealEstateValues,
  errors: RealEstateErrors,
  allErrorsShown: boolean,
  focusedInput: string
}

class RealEstateForm extends React.Component {
  props: Props
  state: State
  handleChange: (fieldName: string, value: string) => void
  handleFocus: (fieldName: string) => void
  handleAddressChange: (values: AddressValues) => void
  handleValuationsChange: (values: Valuations) => void
  handleSubmit: (event: Event) => boolean

  constructor() {
    super()
    this.state = {
      values: RealEstateEmpty,
      errors: {
        name: [],
        address: AddressErrorDefaults,
        notes: []
      },
      allErrorsShown: false,
      focusedInput: 'name'
    }

    this.handleChange = (fieldName, value) => {
      const updatedValues = this.state.values
      updatedValues[fieldName] = value
      this.setState({
        values: updatedValues,
        errors: this.validate()
      })
    }

    this.handleFocus = (fieldName) => { this.setState({ focusedInput: fieldName }) }

    this.handleAddressChange = (values) => {
      const updatedValues = this.state.values
      updatedValues.address = values
      this.setState({
        values: updatedValues,
        errors: this.validate()
      })
    }

    this.handleValuationsChange = (valuations) => {
      const updatedValues = this.state.values
      updatedValues.valuations = valuations
      this.setState({
        values: updatedValues,
        errors: this.validate()
      })
    }

    this.handleSubmit = (event) => {
      event.preventDefault()
      const errors = this.validate()
      this.setState({ errors: errors })
      if (!errors) {
        save(this.state.values).then((id) => {
          let values = Object.assign({}, this.state.values, { id: id })
          this.setState({ values: values })
          if (this.props.eventPublisher) {
            this.props.eventPublisher.publish('CreateRealEstate', this.state.values)
          }
        }).catch((error) => console.error(error))
      } else {
        const firstErrorFieldName = RealEstateForm.findFirstErrorFieldName(errors)
        firstErrorFieldName
          ? this.setState({ allErrorsShown: true, focusedInput: firstErrorFieldName })
          : this.setState({ allErrorsShown: true })
      }
      return false
    }
  }

  static findFirstErrorFieldName(errors: RealEstateErrors): string|null {
    return (function seek(errors, parentComponentName) {
      let match = null
      Object.keys(errors).some(fieldName => {
        if (errors[fieldName] instanceof Array) {
          if (errors[fieldName].length > 0) {
            match = parentComponentName ? parentComponentName + '-' + fieldName : fieldName
            return true
          } else return false
        } else if (errors[fieldName] instanceof Object) {
          match = seek(errors[fieldName], fieldName)
          return (match !== null)
        }
      })
      return match
    })(errors)
  }

  render() {
    const values = this.state.values
    const errors = this.state.errors
    const idField = values.id ? <HiddenField name='id' value={values.id} /> : null

    return (
      <form className='real-estate-form form form-aligned' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>General details</legend>

          {idField}
          <InputField name='name' type='text' label='Name' value={values.name}
            errors={errors.name} forceErrorDisplay={this.state.allErrorsShown}
            onChange={(value) => this.handleChange('name', value)}
            onFocus={this.handleFocus} focus={this.state.focusedInput} />
          <AddressField name='address' value={values.address} errors={errors.address}
            onChange={this.handleAddressChange}
            onFocus={this.handleFocus} focus={this.state.focusedInput} />
          <TextAreaField name='notes' label='Notes' value={values.notes}
            onChange={(value) => this.handleChange('notes', value)}
            onFocus={this.handleFocus} focus={this.state.focusedInput} />
        </fieldset>
        <fieldset>
          <legend>Value</legend>
          <ValuationsInput name='valuations' value={values.valuations} onChange={this.handleValuationsChange} />
        </fieldset>
        <fieldset>
          <legend>Mortgage</legend>
          <button type='submit' className='button button-primary'>Submit</button>
        </fieldset>
      </form>
    )
  }

  validate(): RealEstateErrors {
    const values = this.state.values
    let errors = {}

    errors.name = []
    errors.name = errors.name.concat(Validations.required(values.name))
    errors.name = errors.name.concat(Validations.minLength(values.name, 3))
    errors.name = errors.name.concat(Validations.maxLength(values.name, 100))

    errors.address = AddressField.validate(values.address)

    errors.notes = []

    return errors
  }
}

export default RealEstateForm
