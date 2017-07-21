import React from 'react'
import PropTypes from 'prop-types'

import InputField from './InputField.js'
import CurrencyField from './CurrencyField.js'
import HiddenField from './HiddenField.js'
import DateField from './DateField.js'
import SelectField from './SelectField.js'
import * as Validations from '../utils/formValidation.js'
import { LoanDefaults } from '../data/loan.js'

import '../styles/forms.css'
import '../styles/buttons.css'

class LoanForm extends React.Component {
  static propTypes = {
    loan: PropTypes.shape({
      name: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      principal: PropTypes.number,
      interestRate: PropTypes.number,
      compoundingPeriod: PropTypes.oneOf([ 'daily', 'monthly' ]),
      lengthInYears: PropTypes.number,
      establishmentFees: PropTypes.number,
      repaymentType: PropTypes.oneOf([ 'principalAndInterest', 'interestOnly' ]),
    }),
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      loan: LoanDefaults,
      allErrorsShown: false,
      focusedInput: 'name',
    }

    if (props.loan) {
      const loan = props.loan
      this.state = {
        ...this.state,
        loan,
        errors: LoanForm.validate(loan),
        allErrorsShown: true,
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(fieldName, value): void {
    this.setState(prevState => {
      const loan = { ...prevState.loan, [fieldName]: value }
      return {
        loan,
        errors: LoanForm.validate(loan),
      }
    })
  }

  handleFocus(fieldName): void {
    this.setState(() => ({ focusedInput: fieldName }))
  }

  handleSubmit(event): boolean {
    event.preventDefault()
    this.setState(
      () => ({ errors: LoanForm.validate(this.state.loan) }),
      () => {
        const { errors, loan } = this.state
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
            this.props.onSubmit(loan)
          }
        }
      }
    )
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loan) {
      this.setState(() => ({ loan: nextProps.loan }))
    }
  }

  render() {
    const { loan, allErrorsShown, focusedInput } = this.state
    const errors = this.state.errors === undefined ? {} : this.state.errors
    const idField =
      typeof loan.id === 'string'
        ? <HiddenField name='id' value={loan.id} />
        : null

    return (
      <form
        className='loan-form form form-aligned'
        onSubmit={this.handleSubmit}
      >
        <fieldset>
          {idField}
          <InputField
            name='name'
            type='text'
            label='Name'
            value={loan.name}
            errors={errors.name}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('name', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <DateField
            name='startDate'
            label='Start date'
            value={loan.startDate}
            errors={errors.startDate}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('startDate', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <DateField
            name='endDate'
            label='End date'
            value={loan.endDate}
            errors={errors.endDate}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('endDate', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <CurrencyField
            name='principal'
            label='Principal amount'
            value={loan.principal ? loan.principal.toString() : undefined}
            errors={errors.principal}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('principal', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <InputField
            name='interestRate'
            type='number'
            min={0}
            label='Interest rate (basis points)'
            value={loan.interestRate ? loan.interestRate.toString() : undefined}
            errors={errors.interestRate}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('interestRate', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <SelectField
            name='compoundingPeriod'
            label='Compounding period'
            options={[ [ 'Daily', 'daily' ], [ 'Monthly', 'monthly' ] ]}
            value={loan.compoundingPeriod}
            errors={errors.compoundingPeriod}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('compoundingPeriod', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <InputField
            name='lengthInYears'
            type='number'
            min={0}
            label='Length in years'
            value={
              loan.lengthInYears ? loan.lengthInYears.toString() : undefined
            }
            errors={errors.lengthInYears}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('lengthInYears', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <CurrencyField
            name='establishmentFees'
            label='Establishment fees'
            value={
              loan.establishmentFees
                ? loan.establishmentFees.toString()
                : undefined
            }
            errors={errors.establishmentFees}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('establishmentFees', value)}
            onFocus={this.handleFocus}
            focus={focusedInput}
          />
          <SelectField
            name='repaymentType'
            label='Repayment type'
            options={[ [ 'Daily', 'daily' ], [ 'Monthly', 'monthly' ] ]}
            value={loan.repaymentType}
            errors={errors.repaymentType}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('repaymentType', value)}
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

  static validate(loan) {
    const name = []
      .concat(Validations.required(loan.name))
      .concat(Validations.minLength(loan.name, 3))
      .concat(Validations.maxLength(loan.name, 100))

    return { name }
  }
}

export default LoanForm
