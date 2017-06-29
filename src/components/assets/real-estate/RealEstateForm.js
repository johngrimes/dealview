// @flow

import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import InputField from 'components/forms/InputField'
import HiddenField from 'components/forms/HiddenField'
import AddressField, { AddressErrorsDefaults } from 'components/forms/AddressField'
import TextAreaField from 'components/forms/TextAreaField'
import ValuationsInput from 'components/forms/ValuationsInput/ValuationsInput'
import DateField from 'components/forms/DateField'
import * as Validations from 'utils/FormValidation'
import { RealEstateDefaults } from 'types/assets/realEstate'
import { DateStorageFormat } from 'types/commonTypes'
import { updateValuationsWithPurchaseOrSale, updateValuationsWithPurchase,
  updateValuationsWithSale, purchaseFilter, saleFilter } from 'types/valuations'
import type { RealEstate } from 'types/assets/realEstate'
import type { Address } from 'types/commonTypes'
import type { AddressErrors } from 'components/forms/AddressField'
import type { Valuations } from 'types/valuations'
import type { FieldErrors } from 'utils/FormValidation'

import 'styles/forms.css'
import 'styles/buttons.css'
import 'styles/tables.css'
import 'components/assets/real-estate/RealEstateForm.css'

type RealEstateErrors = {
  +name: FieldErrors,
  +address: AddressErrors,
  +notes: FieldErrors,
  +purchaseDate: FieldErrors,
  +purchaseAmount: FieldErrors,
  +saleDate: FieldErrors,
  +saleAmount: FieldErrors,
  +valuations: FieldErrors,
}
const RealEstateErrorsDefaults = {
  name: [],
  address: AddressErrorsDefaults,
  notes: [],
  purchaseDate: [],
  purchaseAmount: [],
  saleDate: [],
  saleAmount: [],
  valuations: [],
}

type Props = {
  +realEstate?: RealEstate,
  +onSubmit?: (realEstate: RealEstate) => void
}

type State = {
  +realEstate: RealEstate,
  +purchase?: { date: string, amount: number },
  +sale?: { date: string, amount: number },
  +errors?: RealEstateErrors,
  +allErrorsShown: boolean,
  +focusedInput: string
}

class RealEstateForm extends React.Component {
  props: Props
  state: State
  handleChange: (fieldName: string, value: string) => void
  handleFocus: (fieldName: string) => void
  handleAddressChange: (address: Address) => void
  handleValuationsChange: (valuations: Valuations) => void
  handlePurchaseChange: (purchase: { +date?: string, +amount?: number }) => void
  handleSaleChange: (sale: { +date?: string, +amount?: number }) => void
  handleSubmit: (event: Event) => boolean

  constructor(props: Props) {
    super(props)
    this.state = {
      realEstate: RealEstateDefaults,
      allErrorsShown: false,
      focusedInput: 'name',
    }

    if (props.realEstate) {
      const realEstate = props.realEstate
      const valuations = props.realEstate.valuations
        ? props.realEstate.valuations
        : []
      this.state = {
        ...this.state,
        realEstate,
        purchase: _.pick(valuations.find(purchaseFilter), [ 'date', 'amount' ]),
        sale: _.pick(valuations.find(saleFilter), [ 'date', 'amount' ]),
        errors: RealEstateForm.validate(realEstate),
        allErrorsShown: true,
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleValuationsChange = this.handleValuationsChange.bind(this)
    this.handlePurchaseChange = this.handlePurchaseChange.bind(this)
    this.handleSaleChange = this.handleSaleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(fieldName: string, value: string): void {
    this.setState(prevState => {
      const realEstate = { ...prevState.realEstate, [fieldName]: value }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate),
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
        errors: RealEstateForm.validate(realEstate),
      }
    })
  }

  handleValuationsChange(valuations: Valuations): void {
    this.setState(prevState => {
      let purchaseVal = valuations.find(v => v.type === 'purchase')
      let saleVal = valuations.find(v => v.type === 'sale')
      let updatedValuations = valuations
      if (purchaseVal) {
        purchaseVal = _.pick(purchaseVal, [ 'date', 'amount' ])
        updatedValuations = updateValuationsWithPurchase(valuations, purchaseVal)
      }
      if (saleVal) {
        saleVal = _.pick(saleVal, [ 'date', 'amount' ])
        updatedValuations = updateValuationsWithSale(valuations, saleVal)
      }
      const realEstate = { ...prevState.realEstate, valuations: updatedValuations }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate),
      }
    })
  }

  handlePurchaseOrSaleChange(purchaseOrSale: { +date?: string, +amount?: number }, type: 'purchase'|'sale'): void {
    this.setState(prevState => {
      const updatedPurchaseOrSale = { ...prevState[type], ...purchaseOrSale }
      const updatedValuations = updateValuationsWithPurchaseOrSale(prevState.realEstate.valuations, updatedPurchaseOrSale, type)
      const realEstate = {
        ...prevState.realEstate,
        valuations: updatedValuations,
        [ type === 'purchase' ? 'purchaseDate' : 'saleDate' ]: updatedPurchaseOrSale.date,
      }
      return {
        ...prevState,
        realEstate,
        [ type === 'purchase' ? 'purchase' : 'sale' ]: updatedPurchaseOrSale,
        errors: RealEstateForm.validate(realEstate),
      }
    })
  }

  handlePurchaseChange(purchase: { +date?: string, +amount?: number }): void {
    return this.handlePurchaseOrSaleChange(purchase, 'purchase')
  }

  handleSaleChange(sale: { +date?: string, +amount?: number }): void {
    return this.handlePurchaseOrSaleChange(sale, 'sale')
  }

  handleSubmit(event: Event): boolean {
    event.preventDefault()
    this.setState(
      () => ({ errors: RealEstateForm.validate(this.state.realEstate) }),
      () => {
        const { errors, realEstate } = this.state
        if (typeof errors !== 'undefined' && Validations.areErrorsPresent(errors)) {
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
    const { realEstate, purchase, sale, allErrorsShown, focusedInput } = this.state
    const errors = this.state.errors === undefined ? {} : this.state.errors
    const idField = typeof realEstate.id === 'string'
      ? <HiddenField name='id' value={realEstate.id} />
      : null
    const minValuationDate = purchase && purchase.date
      ? moment(purchase.date, DateStorageFormat).add(1, 'd') : undefined
    const maxValuationDate = sale && sale.date
      ? moment(sale.date, DateStorageFormat).subtract(1, 'd') : undefined

    return (
      <form className='real-estate-form form form-aligned' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>General details</legend>

          {idField}
          <InputField name='name' type='text' label='Name' value={realEstate.name}
            errors={errors.name} forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('name', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
          <AddressField name='address' address={realEstate.address} errors={errors.address}
            onChange={this.handleAddressChange}
            onFocus={this.handleFocus} focus={focusedInput} />
          <TextAreaField name='notes' label='Notes' value={realEstate.notes}
            onChange={value => this.handleChange('notes', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
        </fieldset>
        <fieldset>
          <legend>Purchase</legend>
          <DateField name='purchaseDate' label='Purchase date'
            value={purchase ? purchase.date : undefined} errors={errors.purchaseDate}
            forceErrorDisplay={allErrorsShown}
            maxDate={maxValuationDate}
            onChange={value => this.handlePurchaseChange({ date: value })}
            onFocus={this.handleFocus} focus={focusedInput} />
          <InputField name='purchaseAmount' label='Purchase amount' type='number' min='1'
            value={purchase && purchase.amount ? purchase.amount.toString() : undefined}
            errors={errors.purchaseAmount}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handlePurchaseChange({ amount: parseInt(value) })}
            onFocus={this.handleFocus} focus={focusedInput} />
        </fieldset>
        <fieldset>
          <legend>Sale</legend>
          <DateField name='saleDate' label='Sale date'
            value={sale ? sale.date : undefined} errors={errors.saleDate}
            forceErrorDisplay={allErrorsShown}
            minDate={minValuationDate}
            onChange={value => this.handleSaleChange({ date: value })}
            onFocus={this.handleFocus} focus={focusedInput} />
          <InputField name='saleAmount' label='Sale amount' type='number' min='1'
            value={sale && sale.amount ? sale.amount.toString() : undefined}
            errors={errors.saleAmount}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleSaleChange({ amount: parseInt(value) })}
            onFocus={this.handleFocus} focus={focusedInput} />
        </fieldset>
        <fieldset>
          <legend>Value</legend>
          <ValuationsInput name='valuations' valuations={realEstate.valuations}
            minDate={minValuationDate} maxDate={maxValuationDate}
            errors={errors.valuations} forceErrorDisplay={allErrorsShown}
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
    const name = []
      .concat(Validations.required(realEstate.name))
      .concat(Validations.minLength(realEstate.name, 3))
      .concat(Validations.maxLength(realEstate.name, 100))
    const address = AddressField.validate(realEstate.address)
    const purchaseDate = []
      .concat(Validations.required(realEstate.purchaseDate))
    const valuations = []
      .concat(ValuationsInput.validate(realEstate.valuations))
      .concat(RealEstateForm.purchaseValuationPresent(realEstate))
      .concat(RealEstateForm.valuationsWithinPurchaseAndSale(realEstate))

    return {
      ...RealEstateErrorsDefaults,
      name,
      address,
      purchaseDate,
      valuations,
    }
  }

  static purchaseValuationPresent(realEstate: RealEstate): FieldErrors {
    return Validations.validate(
      realEstate,
      re => re.valuations.some(valuation => valuation.type === 'purchase'),
      'There must be a purchase valuation'
    )
  }

  static valuationsWithinPurchaseAndSale(realEstate: RealEstate): FieldErrors {
    const purchaseVal = realEstate.valuations.find(v => v.type === 'purchase')
    const saleVal = realEstate.valuations.find(v => v.type === 'sale')
    if (!purchaseVal) { return [] }

    return Validations.validate(
      realEstate,
      re => re.valuations.every(valuation =>
        [ 'purchase', 'sale' ].includes(valuation.type) || (saleVal
          ? valuation.date > purchaseVal.date && valuation.date < saleVal.date
          : valuation.date > purchaseVal.date)
      ),
      'Valuations must all be between the purchase and sale dates'
    )
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
