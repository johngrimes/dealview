// @flow

import React from 'react'
import _ from 'lodash'

import InputField from '../../forms/InputField.js'
import HiddenField from '../../forms/HiddenField.js'
import AddressField, { AddressErrorsDefaults } from '../../forms/AddressField.js'
import TextAreaField from '../../forms/TextAreaField.js'
import ValuationsInput from '../../forms/ValuationsInput.js'
import DateField from '../../forms/DateField.js'
import * as Validations from '../../../utils/FormValidation.js'
import { RealEstateDefaults } from '../../../data/assets/realEstate.js'
import type { RealEstate } from '../../../data/assets/realEstate.js'
import type { Address } from '../../../data/commonTypes.js'
import type { AddressErrors } from '../../forms/AddressField.js'
import type { Valuations } from '../../../components/forms/ValuationsInput.js'
import type { FieldErrors } from '../../../utils/FormValidation.js'

import '../../../styles/forms.css'
import '../../../styles/buttons.css'
import '../../../styles/tables.css'
import './RealEstateForm.css'

type RealEstateErrors = {
  name: FieldErrors,
  address: AddressErrors,
  notes: FieldErrors,
  purchaseDate: FieldErrors,
  saleDate: FieldErrors
}
const RealEstateErrorsDefaults = {
  name: [],
  address: AddressErrorsDefaults,
  notes: [],
  purchaseDate: [],
  saleDate: []
}

type Props = {
  realEstate?: RealEstate,
  onSubmit?: (realEstate: RealEstate) => void
}

type State = {
  realEstate: RealEstate,
  errors?: RealEstateErrors,
  allErrorsShown: boolean,
  focusedInput: string
}

class RealEstateForm extends React.Component {
  props: Props
  state: State
  handleChange: (fieldName: string, value: string) => void
  handleFocus: (fieldName: string) => void
  handleAddressChange: (address: Address) => void
  handleValuationsChange: (valuations: Valuations) => void
  handleSubmit: (event: Event) => boolean

  constructor(props: Props) {
    super(props)
    this.state = {
      realEstate: RealEstateDefaults,
      allErrorsShown: false,
      focusedInput: 'name'
    }

    if (props.realEstate) { this.state.realEstate = props.realEstate }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleValuationsChange = this.handleValuationsChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(fieldName: string, value: string): void {
    this.setState(prevState => {
      const realEstate = { ...prevState.realEstate, [fieldName]: value }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate)
      }
    })
  }

  handleFocus(fieldName: string): void {
    this.setState(() => ({ focusedInput: fieldName }))
  }

  handleAddressChange(address: Address): void {
    this.setState(prevState => {
      const realEstate = { ...prevState.realEstate, address }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate)
      }
    })
  }

  handleValuationsChange(valuations: Valuations): void {
    this.setState(prevState => {
      const realEstate = { ...prevState.realEstate, valuations }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate)
      }
    })
  }

  handleSubmit(event: Event): boolean {
    event.preventDefault()
    this.setState(
      () => ({ errors: RealEstateForm.validate(this.state.realEstate) }),
      () => {
        const { errors, realEstate } = this.state
        if (errors !== undefined && Validations.areErrorsPresent(errors)) {
          const firstErrorFieldName = RealEstateForm.findFirstErrorFieldName(errors)
          firstErrorFieldName
            ? this.setState(() => ({ allErrorsShown: true, focusedInput: firstErrorFieldName }))
            : this.setState(() => ({ allErrorsShown: true }))
        } else {
          if (this.props.onSubmit) { this.props.onSubmit(realEstate) }
        }
      }
    )
    return false
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.realEstate) {
      this.setState(() => ({ realEstate: nextProps.realEstate }))
    }
  }

  render() {
    const { realEstate, allErrorsShown, focusedInput } = this.state
    const errors = this.state.errors === undefined ? {} : this.state.errors
    const idField = typeof realEstate.id === 'string'
      ? <HiddenField name='id' value={realEstate.id} />
      : null

    return (
      <form className='real-estate-form form form-aligned' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>General details</legend>

          {idField}
          <InputField name='name' type='text' label='Name' value={realEstate.name}
            errors={errors.name} forceErrorDisplay={allErrorsShown}
            onChange={(value) => this.handleChange('name', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
          <AddressField name='address' address={realEstate.address} errors={errors.address}
            onChange={this.handleAddressChange}
            onFocus={this.handleFocus} focus={focusedInput} />
          <TextAreaField name='notes' label='Notes' value={realEstate.notes}
            onChange={(value) => this.handleChange('notes', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
        </fieldset>
        <fieldset>
          <legend>Purchase and sale</legend>
          <DateField name='purchaseDate' label='Purchase date'
            value={realEstate.purchaseDate} errors={errors.purchaseDate}
            forceErrorDisplay={allErrorsShown}
            onChange={(value) => this.handleChange('purchaseDate', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
          <DateField name='saleDate' label='Sale date'
            value={realEstate.saleDate} errors={errors.saleDate}
            forceErrorDisplay={allErrorsShown}
            onChange={(value) => this.handleChange('saleDate', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
        </fieldset>
        <fieldset>
          <legend>Value</legend>
          <ValuationsInput name='valuations' valuations={realEstate.valuations}
            onChange={this.handleValuationsChange} onFocus={this.handleFocus} />
        </fieldset>
        <fieldset>
          <legend>Mortgage</legend>
          <button type='submit' className='button button-primary'>Submit</button>
        </fieldset>
      </form>
    )
  }

  static validate(realEstate: RealEstate): RealEstateErrors {
    const errors = RealEstateErrorsDefaults

    errors.name = []
      .concat(Validations.required(realEstate.name))
      .concat(Validations.minLength(realEstate.name, 3))
      .concat(Validations.maxLength(realEstate.name, 100))

    errors.address = AddressField.validate(realEstate.address)

    errors.notes = []

    errors.purchaseDate = []
      .concat(Validations.required(realEstate.purchaseDate))

    return errors
  }

  static findFirstErrorFieldName(realEstateErrors: RealEstateErrors): string|null {
    return (function seek(realEstateErrors, parentComponentName) {
      let match = null
      _.some(realEstateErrors, (errors, fieldName) => {
        if (errors instanceof Array) {
          if (errors.length > 0) {
            match = parentComponentName ? parentComponentName + '-' + fieldName : fieldName
            return true
          } else return false
        } else if (errors instanceof Object) {
          match = seek(errors, fieldName)
          return (match !== null)
        }
      })
      return match
    })(realEstateErrors)
  }
}

export default RealEstateForm
