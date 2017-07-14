import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import InputField from './InputField.js'
import CurrencyField from './CurrencyField.js'
import HiddenField from './HiddenField.js'
import AddressField, { AddressErrorsDefaults } from './AddressField.js'
import TextAreaField from './TextAreaField.js'
import ValuationsInput from './ValuationsInput.js'
import DateField from './DateField.js'
import * as Validations from '../utils/formValidation.js'
import { RealEstateDefaults } from '../data/realEstate.js'
import { DateStorageFormat } from '../data/commonTypes.js'
import {
  updateValuationsWithPurchaseOrSale,
  updateValuationsWithPurchase,
  updateValuationsWithSale,
  purchaseFilter,
  saleFilter,
} from '../data/valuations.js'

import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/tables.css'
import './styles/RealEstateForm.css'

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

class RealEstateForm extends React.Component {
  constructor(props) {
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

    this.handleFocus = this.handleFocus.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleValuationsChange = this.handleValuationsChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(fieldName, value) {
    this.setState(prevState => {
      const realEstate = { ...prevState.realEstate, [fieldName]: value }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate),
      }
    })
  }

  handleFocus(fieldName) {
    this.setState(() => ({ focusedInput: fieldName }))
  }

  handleAddressChange(address) {
    this.setState(prevState => {
      const realEstate = { ...prevState.realEstate, address }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate),
      }
    })
  }

  handleValuationsChange(valuations) {
    this.setState(prevState => {
      let purchaseVal = valuations.find(v => v.type === 'purchase')
      let saleVal = valuations.find(v => v.type === 'sale')
      let updatedValuations = valuations
      if (purchaseVal) {
        purchaseVal = _.pick(purchaseVal, [ 'date', 'amount' ])
        updatedValuations = updateValuationsWithPurchase(
          valuations,
          purchaseVal
        )
      }
      if (saleVal) {
        saleVal = _.pick(saleVal, [ 'date', 'amount' ])
        updatedValuations = updateValuationsWithSale(valuations, saleVal)
      }
      const realEstate = {
        ...prevState.realEstate,
        valuations: updatedValuations,
      }
      return {
        realEstate,
        errors: RealEstateForm.validate(realEstate),
      }
    })
  }

  handlePurchaseOrSaleChange(purchaseOrSale, type) {
    this.setState(prevState => {
      const updatedPurchaseOrSale = { ...prevState[type], ...purchaseOrSale }
      const updatedValuations = updateValuationsWithPurchaseOrSale(
        prevState.realEstate.valuations,
        updatedPurchaseOrSale,
        type
      )
      const realEstate = {
        ...prevState.realEstate,
        valuations: updatedValuations,
        [type === 'purchase' // eslint-disable-line
          ? 'purchaseDate'
          : 'saleDate']: updatedPurchaseOrSale.date,
      }
      return {
        ...prevState,
        realEstate,
        [type === 'purchase' ? 'purchase' : 'sale']: updatedPurchaseOrSale,
        errors: RealEstateForm.validate(realEstate),
      }
    })
  }

  handlePurchaseChange(purchase) {
    return this.handlePurchaseOrSaleChange(purchase, 'purchase')
  }

  handleSaleChange(sale) {
    return this.handlePurchaseOrSaleChange(sale, 'sale')
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState(
      () => ({ errors: RealEstateForm.validate(this.state.realEstate) }),
      () => {
        const { errors, realEstate } = this.state
        if (
          typeof errors !== 'undefined' &&
          Validations.areErrorsPresent(errors)
        ) {
          const firstErrorFieldName = Validations.findFirstErrorFieldName(
            errors
          )
          firstErrorFieldName
            ? this.setState(() => ({
              allErrorsShown: true,
              focusedInput: firstErrorFieldName,
            }))
            : this.setState(() => ({ allErrorsShown: true }))
        } else {
          if (this.props.onSubmit) {
            this.props.onSubmit(realEstate)
          }
        }
      }
    )
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.realEstate) {
      this.setState(() => ({ realEstate: nextProps.realEstate }))
    }
  }

  render() {
    const {
      realEstate,
      purchase,
      sale,
      allErrorsShown,
      focusedInput,
    } = this.state
    const errors = this.state.errors === undefined ? {} : this.state.errors
    const idField =
      typeof realEstate.id === 'string'
        ? <HiddenField name='id' value={realEstate.id} />
        : null
    const minValuationDate =
      purchase && purchase.date
        ? moment(purchase.date, DateStorageFormat).add(1, 'd')
        : undefined
    const maxValuationDate =
      sale && sale.date
        ? moment(sale.date, DateStorageFormat).subtract(1, 'd')
        : undefined

    return (
      <form
        className='real-estate-form form form-aligned'
        onSubmit={this.handleSubmit}
      >
        <fieldset>
          <legend>General details</legend>

          {idField}
          <InputField
            name='name'
            type='text'
            label='Name'
            value={realEstate.name}
            errors={errors.name}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('name', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <AddressField
            name='address'
            address={realEstate.address}
            errors={errors.address}
            onChange={this.handleAddressChange}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <TextAreaField
            name='notes'
            label='Notes'
            value={realEstate.notes}
            onChange={value => this.handleChange('notes', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
        </fieldset>
        <fieldset>
          <legend>Purchase</legend>
          <DateField
            name='purchaseDate'
            label='Purchase date'
            value={purchase ? purchase.date : undefined}
            errors={errors.purchaseDate}
            forceErrorDisplay={allErrorsShown}
            maxDate={maxValuationDate}
            onChange={value => this.handlePurchaseChange({ date: value })}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <CurrencyField
            name='purchaseAmount'
            label='Purchase amount'
            value={
              purchase && purchase.amount
                ? purchase.amount.toString()
                : undefined
            }
            errors={errors.purchaseAmount}
            forceErrorDisplay={allErrorsShown}
            onChange={value =>
              this.handlePurchaseChange({ amount: parseInt(value, 10) })}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
        </fieldset>
        <fieldset>
          <legend>Sale</legend>
          <DateField
            name='saleDate'
            label='Sale date'
            value={sale ? sale.date : undefined}
            errors={errors.saleDate}
            forceErrorDisplay={allErrorsShown}
            minDate={minValuationDate}
            onChange={value => this.handleSaleChange({ date: value })}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <CurrencyField
            name='saleAmount'
            label='Sale amount'
            value={sale && sale.amount ? sale.amount.toString() : undefined}
            errors={errors.saleAmount}
            forceErrorDisplay={allErrorsShown}
            onChange={value =>
              this.handleSaleChange({ amount: parseInt(value, 10) })}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
        </fieldset>
        <fieldset>
          <legend>Value</legend>
          <ValuationsInput
            name='valuations'
            valuations={realEstate.valuations}
            minDate={minValuationDate}
            maxDate={maxValuationDate}
            errors={errors.valuations}
            forceErrorDisplay={allErrorsShown}
            onChange={this.handleValuationsChange}
            onFocus={this.handleFocus}
          />
        </fieldset>
        <fieldset>
          <legend>Mortgage</legend>
          <button type='submit' className='button button-primary'>
            Submit
          </button>
        </fieldset>
      </form>
    )
  }

  static validate(realEstate) {
    const name = []
      .concat(Validations.required(realEstate.name))
      .concat(Validations.minLength(realEstate.name, 3))
      .concat(Validations.maxLength(realEstate.name, 100))
    const address = AddressField.validate(realEstate.address)
    const purchaseDate = [].concat(
      Validations.required(realEstate.purchaseDate)
    )
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

  static purchaseValuationPresent(realEstate) {
    return Validations.validate(
      realEstate,
      re => re.valuations.some(valuation => valuation.type === 'purchase'),
      'There must be a purchase valuation'
    )
  }

  static valuationsWithinPurchaseAndSale(realEstate) {
    const purchaseVal = realEstate.valuations.find(v => v.type === 'purchase')
    const saleVal = realEstate.valuations.find(v => v.type === 'sale')
    if (!purchaseVal) {
      return []
    }

    return Validations.validate(
      realEstate,
      re =>
        re.valuations.every(
          valuation =>
            [ 'purchase', 'sale' ].includes(valuation.type) ||
            (saleVal
              ? valuation.date > purchaseVal.date &&
                valuation.date < saleVal.date
              : valuation.date > purchaseVal.date)
        ),
      'Valuations must all be between the purchase and sale dates'
    )
  }
}

RealEstateForm.propTypes = {
  realEstate: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      line3: PropTypes.string,
      locality: PropTypes.string,
      state: PropTypes.string,
      postcode: PropTypes.string,
    }),
    notes: PropTypes.string,
    purchaseDate: PropTypes.string,
    saleDate: PropTypes.string,
    valuations: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.number,
        note: PropTypes.string,
        type: PropTypes.oneOf([ 'none', 'purchase', 'sale' ]),
      })
    ),
  }),
  onSubmit: PropTypes.func,
}

export default RealEstateForm
