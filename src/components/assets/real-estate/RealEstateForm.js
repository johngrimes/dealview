// @flow

import React from 'react'

import EventPublisher from '../../../data/events/EventPublisher.js'
import InputField from '../../forms/InputField.js'
import AddressField, { AddressErrorDefaults } from '../../forms/AddressField.js'
import TextAreaField from '../../forms/TextAreaField.js'
import * as Validations from '../../../utils/FormValidation.js'
import { save } from '../../../data/assets/realEstate.js'
import { RealEstateEmpty } from '../../../data/assets/realEstate.js'
import type { RealEstateValues } from '../../../data/assets/realEstate.js'
import type { AddressValues } from '../../../data/commonTypes.js'
import type { FieldErrors } from '../../../utils/FormValidation.js'
import type { AddressErrors } from '../../../components/forms/AddressField.js'

import '../../../styles/forms.css'
import '../../../styles/buttons.css'
import './RealEstateForm.css'

type RealEstateErrors = {
  name: FieldErrors,
  address: AddressErrors,
  notes: FieldErrors
}

type Props = {
  eventPublisher: EventPublisher
}

type State = {
  values: RealEstateValues,
  errors: RealEstateErrors
}

class RealEstateForm extends React.Component {
  props: Props
  state: State
  handleChange: (fieldName: string, value: string) => void
  handleAddressChange: (values: AddressValues) => void
  handleSubmit: (event: Event) => boolean

  constructor() {
    super()
    this.state = {
      values: RealEstateEmpty,
      errors: {
        name: [],
        address: AddressErrorDefaults,
        notes: []
      }
    }

    this.handleChange = (fieldName, value) => {
      const updatedValues = this.state.values
      updatedValues[fieldName] = value
      this.setState({
        values: updatedValues,
        errors: this.validate()
      })
    }

    this.handleAddressChange = (values) => {
      const updatedValues = this.state.values
      updatedValues.address = values
      this.setState({
        values: updatedValues,
        errors: this.validate()
      })
    }

    this.handleSubmit = (event) => {
      event.preventDefault()
      save(this.state.values).then((id) => {
        let values = Object.assign({}, this.state.values, { id: id })
        this.setState({ values: values })
        this.props.eventPublisher.publish('CreateRealEstate', this.state.values)
      }).catch((error) => console.error(error))
      return false
    }
  }

  render() {
    const values = this.state.values
    const errors = this.state.errors

    return (
      <form className='real-estate-form form form-aligned' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>General details</legend>

          <InputField name='id' type='hidden' value={values.id} />
          <InputField name='name' type='text' label='Name' value={values.name} errors={errors.name}
            notifyChange={(value) => this.handleChange('name', value)} />
          <AddressField name='address' value={values.address} errors={errors.address} notifyChange={this.handleAddressChange} />
          <TextAreaField name='notes' label='Notes' value={values.notes}
            notifyChange={(value) => this.handleChange('notes', value)} />
        </fieldset>
        <fieldset>
          <legend>Value</legend>

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
