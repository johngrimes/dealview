// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import _ from 'lodash'
import type { Moment } from 'moment'

import { DateDisplayFormat, DateStorageFormat } from 'types/commonTypes'
import { ValuationDefault, compareValuationsByDate } from 'types/valuations'
import HiddenField from 'components/forms/HiddenField'
import * as Validations from 'utils/FormValidation'
import type { Valuations } from 'types/valuations'
import type { FieldErrors } from 'utils/FormValidation'

import 'components/forms/ValuationsInput/ValuationsInput.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

type Props = {
  +name: string,
  +valuations?: Valuations,
  +minDate?: Moment,
  +maxDate?: Moment,
  +errors?: FieldErrors,
  +forceErrorDisplay?: boolean,
  +focus?: string,
  +onChange?: (valuations: Valuations) => void,
  +onFocus?: (fieldName: string) => void
}

type State = {
  +valuations?: Valuations,
  +touched: boolean,
}

class ValuationsInput extends React.Component {
  props: Props
  state: State
  _refs: { [fieldName: string]: { focus: () => void } }
  handleChange: (i: number, field: string, value: string|number) => void
  handleAddValuation: () => void
  handleDeleteValuation: (index: number) => void
  handleFocus: (event: { target: { name: string } }) => void
  handleBlur: (event: { relatedTarget: { name: string } | null }) => void
  setFocus: () => void

  constructor(props: Props) {
    super(props)
    const valuations = this.props.valuations
      ? this.props.valuations.sort(compareValuationsByDate)
      : this.props.valuations
    this.state = {
      valuations,
      touched: false,
    }
    this._refs = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleAddValuation = this.handleAddValuation.bind(this)
    this.handleDeleteValuation = this.handleDeleteValuation.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.setFocus = this.setFocus.bind(this)
  }

  handleChange(i: number, field: string, value: string|number): void {
    if (this.state.valuations === undefined) return
    this.setState(
      prevState => {
        const updatedValuations = prevState.valuations.slice()
        updatedValuations[i] = { ...updatedValuations[i], [field]: value }
        return {
          ...prevState,
          valuations: updatedValuations,
          touched: true,
        }
      },
      () => {
        if (this.state.valuations && this.props.onChange) {
          this.props.onChange(this.state.valuations)
        }
      }
    )
  }

  handleAddValuation(): void {
    const updatedValuations = this.state.valuations || []
    updatedValuations.push(ValuationDefault)
    this.setState(
      () => ({ valuations: updatedValuations }),
      () => { if (this.props.onChange) this.props.onChange(updatedValuations) }
    )
  }

  handleDeleteValuation(index: number): void {
    this.setState(
      prevState => ({ valuations: prevState.valuations.filter((_, i) => i !== index) }),
      () => { if (this.props.onChange && this.state.valuations) this.props.onChange(this.state.valuations) }
    )
  }

  handleFocus(event: { target: { name: string } }): void {
    const target = event.target
    if (this.props.onFocus) {
      this.props.onFocus(target.name)
    }
  }

  setFocus(): void {
    if (this.props.focus && this._refs[this.props.focus]) {
      this._refs[this.props.focus].focus()
    }
  }

  handleBlur(event: { relatedTarget: { name: string } | null }): void {
    if (event.relatedTarget &&
        !event.relatedTarget.name.match(`^${this.props.name}`)) {
      this.setState(prevState => ({
        valuations: prevState.valuations.sort(compareValuationsByDate),
      }))
    }
  }

  componentWillReceiveProps(props: Props) {
    if (props.valuations) {
      const sortedValuations = props.valuations.sort(compareValuationsByDate)
      this.setState(() => ({ valuations: sortedValuations }))
    }
  }

  componentDidMount() { this.setFocus() }

  componentDidUpdate() { this.setFocus() }

  render() {
    const { errors, forceErrorDisplay, minDate, maxDate } = this.props
    const { touched } = this.state
    const valuations = this.state.valuations === undefined
      ? []
      : this.state.valuations.map((v, i) => {
        return <tr key={i} className={v.type && v.type !== 'none'
            ? `valuation valuation-${v.type}`
            : 'valuation'}>
          <td className='valuations-date'>
            <DatePicker name={`valuations-date-${i}`} dateFormat={DateDisplayFormat}
              selected={v.date ? moment(v.date, DateStorageFormat) : undefined}
              showYearDropdown
              minDate={minDate} maxDate={maxDate}
              autoFocus={this.props.focus === `valuations-date-${i}`}
              onChange={(moment) => this.handleChange(i, 'date', moment.format(DateStorageFormat))}
              onFocus={this.handleFocus} onBlur={this.handleBlur} />
          </td>
          <td className='valuations-amount'>
            <input name={`valuations-amount-${i}`} type='number' min='1'
              value={v.amount ? v.amount.toString() : ''} placeholder='Value'
              onChange={(event) => this.handleChange(i, 'amount', parseInt(event.target.value, 10))}
              ref={input => this._refs[`valuations-amount-${i}`] = input}
              onFocus={this.handleFocus} onBlur={this.handleBlur} />
          </td>
          <td className='valuations-note'>
            <input name={`valuations-note-${i}`} type='text'
              value={v.note} placeholder='Note'
              onChange={(event) => this.handleChange(i, 'note', event.target.value)}
              ref={input => this._refs[`valuations-note-${i}`] = input}
              onFocus={this.handleFocus} onBlur={this.handleBlur} />
            <HiddenField name={`valuations-type-${i}`} type='hidden' value={v.type} />
          </td>
          <td className='valuations-delete'>
            <button className='delete-valuation-button' type='button' onClick={() => this.handleDeleteValuation(i)} />
          </td>
        </tr>
      })
    const errorTags = []
    if (errors) {
      errors.forEach((msg, i) =>
        errorTags.push(<div key={i} className='error'>{msg}</div>)
      )
    }

    return (
      <div className='valuations-input control-group'>
        <table className='valuations table'>
          <tbody>{valuations}</tbody>
        </table>
        {(forceErrorDisplay || touched) &&
          errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
        <button className='button add-valuation-button' type='button' onClick={this.handleAddValuation}>+&nbsp;&nbsp;Add</button>
      </div>
    )
  }

  static validate(valuations: Valuations): FieldErrors {
    return []
      .concat(ValuationsInput.valuationsDontShareDates(valuations))
  }

  static valuationsDontShareDates(valuations: Valuations): FieldErrors {
    return Validations.validate(
      valuations,
      vals => vals.length === _.uniq(vals.map(v => v.date)).length,
      'Valuations must all be on different dates'
    )
  }
}

export default ValuationsInput
