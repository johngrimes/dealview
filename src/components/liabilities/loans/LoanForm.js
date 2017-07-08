// @flow

import React from 'react'

import InputField from 'components/forms/InputField'
import HiddenField from 'components/forms/HiddenField'
import DateField from 'components/forms/DateField'
import * as Validations from 'utils/FormValidation'
import { LoanDefaults } from 'types/liabilities/loan'
import { findFirstErrorFieldName } from 'utils/FormValidation'
import type { Loan } from 'types/liabilities/loan'
import type { FieldErrors } from 'utils/FormValidation'

import 'styles/forms.css'
import 'styles/buttons.css'
import 'styles/tables.css'

type LoanErrors = {
  +name: FieldErrors,
  +startDate: FieldErrors,
  +endDate: FieldErrors,
}
const LoanErrorDefaults = {
  name: [],
  startDate: [],
  endDate: [],
}

type Props = {
  +loan?: Loan,
  +onSubmit?: (loan: Loan) => void
}

type State = {
  +loan: Loan,
  +errors?: LoanErrors,
  +allErrorsShown: boolean,
  +focusedInput: string
}

class LoanForm extends React.Component {
  props: Props
  state: State
  handleChange: (fieldName: string, value: string) => void
  handleFocus: (fieldName: string) => void
  handleSubmit: (event: Event) => boolean

  constructor(props: Props) {
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

  handleChange(fieldName: string, value: string): void {
    this.setState(prevState => {
      const loan = { ...prevState.loan, [fieldName]: value }
      return {
        loan,
        errors: LoanForm.validate(loan),
      }
    })
  }

  handleFocus(fieldName: string): void {
    this.setState(() => ({ focusedInput: fieldName }))
  }

  handleSubmit(event: Event): boolean {
    event.preventDefault()
    this.setState(
      () => ({ errors: LoanForm.validate(this.state.loan) }),
      () => {
        const { errors, loan } = this.state
        if (typeof errors !== 'undefined' && Validations.areErrorsPresent(errors)) {
          const firstErrorFieldName = findFirstErrorFieldName(errors)
          firstErrorFieldName
            ? this.setState(() => ({ allErrorsShown: true, focusedInput: firstErrorFieldName }))
            : this.setState(() => ({ allErrorsShown: true }))
        } else {
          if (this.props.onSubmit) { this.props.onSubmit(loan) }
        }
      }
    )
    return false
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loan) {
      this.setState(() => ({ loan: nextProps.loan }))
    }
  }

  render() {
    const { loan, allErrorsShown, focusedInput } = this.state
    const errors = this.state.errors === undefined ? {} : this.state.errors
    const idField = typeof loan.id === 'string'
      ? <HiddenField name='id' value={loan.id} />
      : null

    return (
      <form className='loan-form form form-aligned' onSubmit={this.handleSubmit}>
        <fieldset>
          {idField}
          <InputField name='name' type='text' label='Name' value={loan.name}
            errors={errors.name} forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('name', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
          <DateField name='startDate' label='Start date'
            value={loan.startDate} errors={errors.startDate}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('startDate', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
          <DateField name='endDate' label='End date'
            value={loan.endDate} errors={errors.endDate}
            forceErrorDisplay={allErrorsShown}
            onChange={value => this.handleChange('endDate', value)}
            onFocus={this.handleFocus} focus={focusedInput} />
        </fieldset>
        <fieldset>
          <button type='submit' className='button button-primary'>Submit</button>
        </fieldset>
      </form>
    )
  }

  static validate(loan: Loan): LoanErrors {
    const name = []
      .concat(Validations.required(loan.name))
      .concat(Validations.minLength(loan.name, 3))
      .concat(Validations.maxLength(loan.name, 100))

    return {
      ...LoanErrorDefaults,
      name,
    }
  }
}

export default LoanForm
