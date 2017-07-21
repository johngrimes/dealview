import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import InputField from './InputField.js'
import CurrencyField from './CurrencyField.js'
import HiddenField from './HiddenField.js'
import DateField from './DateField.js'
import * as Validations from '../utils/formValidation.js'

import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/tables.css'

class AssetForm extends React.Component {
  static propTypes = {
    asset: PropTypes.shape({
      name: PropTypes.string,
      currentValue: PropTypes.string,
      purchaseDate: PropTypes.string,
      purchaseAmount: PropTypes.string,
      saleDate: PropTypes.string,
      forecastGrowth: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      asset: {},
      current: true,
      allErrorsShown: false,
      focusedInput: 'name',
    }

    if (props.asset) {
      const asset = props.asset
      this.state = {
        ...this.state,
        asset,
        current:
          typeof asset.purchaseDate !== 'string' &&
          typeof asset.purchaseAmount !== 'number',
        errors: AssetForm.validate(asset),
        allErrorsShown: true,
      }
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(fieldName, value) {
    this.setState(prevState => {
      const asset = { ...prevState.asset, [fieldName]: value }
      return {
        asset,
        errors: AssetForm.validate(asset),
      }
    })
  }

  handleChangeCurrent(value) {
    this.setState(prevState => ({
      current: value,
      asset: value
        ? _.omit(prevState.asset, 'purchaseDate', 'purchaseAmount')
        : _.omit(prevState.asset, 'currentValue'),
    }))
  }

  handleFocus(fieldName) {
    this.setState(() => ({ focusedInput: fieldName }))
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState(
      () => ({ errors: AssetForm.validate(this.state.asset) }),
      () => {
        const { errors, asset } = this.state
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
            this.props.onSubmit(asset)
          }
        }
      }
    )
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset) {
      this.setState(() => ({ asset: nextProps.asset }))
    }
  }

  render() {
    const { asset, current, allErrorsShown, focusedInput } = this.state
    const errors = this.state.errors === undefined ? {} : this.state.errors
    const idField =
      typeof asset.id === 'string'
        ? <HiddenField name='id' value={asset.id} />
        : null
    const today = moment().startOf('day')

    return (
      <form
        className='asset-form form form-aligned'
        onSubmit={this.handleSubmit}
      >
        <fieldset>
          <legend>General details</legend>

          {idField}
          <InputField
            name='name'
            type='text'
            label='Name'
            value={asset.name}
            errors={errors.name}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('name', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
        </fieldset>
        <fieldset>
          <InputField
            name='current'
            type='checkbox'
            label='I currently own this property'
            checked={current}
            onChange={(_, c) => this.handleChangeCurrent(c)}
          />
        </fieldset>
        {current
          ? <fieldset>
              <legend>Current value</legend>
              <CurrencyField
                name='currentValue'
                label='Current value'
                value={asset.currentValue}
                errors={errors.currentValue}
                forceErrorDisplay={allErrorsShown}
                onChange={value => this.handleChange('currentValue', value)}
                onFocus={this.handleFocus}
                focus={focusedInput}
              />
            </fieldset>
          : <fieldset>
              <legend>Future purchase</legend>
              <DateField
                name='purchaseDate'
                label='Purchase date'
                value={asset.purchaseDate}
                errors={errors.purchaseDate}
                forceErrorDisplay={allErrorsShown}
                minDate={today}
                onChange={value => this.handleChange('purchaseDate', value)}
                onFocus={this.handleFocus}
                focus={focusedInput}
              />
              <CurrencyField
                name='purchaseAmount'
                label='Purchase amount'
                value={asset.purchaseAmount}
                errors={errors.purchaseAmount}
                forceErrorDisplay={allErrorsShown}
                onChange={value => this.handleChange('purchaseAmount', value)}
                onFocus={this.handleFocus}
                focus={focusedInput}
              />
            </fieldset>}
        <fieldset>
          <legend>Future sale</legend>
          <DateField
            name='saleDate'
            label='Sale date'
            value={asset.saleDate}
            errors={errors.saleDate}
            forceErrorDisplay={allErrorsShown}
            minDate={today}
            onChange={value => this.handleChange('saleDate', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
        </fieldset>
        <fieldset>
          <legend>Forecast capital growth</legend>
          <InputField
            name='forecastGrowth'
            type='number'
            min={0}
            label='% per year'
            value={asset.forecastGrowth}
            errors={errors.forecastGrowth}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('forecastGrowth', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
        </fieldset>
        <fieldset>
          <button type='submit' className='button button-primary'>
            Submit
          </button>
        </fieldset>
      </form>
    )
  }

  static validate(asset) {
    const name = []
      .concat(Validations.required(asset.name))
      .concat(Validations.minLength(asset.name, 3))
      .concat(Validations.maxLength(asset.name, 100))
    const forecastGrowth = Validations.required(asset.forecastGrowth)

    return { name, forecastGrowth }
  }
}

export default AssetForm
