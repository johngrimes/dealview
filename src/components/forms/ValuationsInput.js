// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { DateFormat } from 'types/commonTypes'
import type { Valuations } from 'types/valuations'

import 'components/forms/ValuationsInput.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

type Props = {
  name: string,
  valuations?: Valuations,
  focus?: string,
  onChange?: (valuations: Valuations) => void,
  onFocus?: (fieldName: string) => void
}

type State = {
  valuations?: Valuations
}

class ValuationsInput extends React.Component {
  props: Props
  state: State
  _refs: { [fieldName: string]: { focus: () => void } }
  handleChange: (i: number, field: string, value: string|number) => void
  handleAddValuation: () => void
  handleFocus: (event: { target: { name: string } }) => void
  setFocus: () => void

  constructor(props: Props) {
    super(props)
    this.state = { valuations: this.props.valuations }
    this._refs = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleAddValuation = this.handleAddValuation.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.setFocus = this.setFocus.bind(this)
  }

  handleChange(i: number, field: string, value: string|number): void {
    if (this.state.valuations === undefined) return
    const updatedValuations = this.state.valuations
    updatedValuations[i][field] = value
    this.setState(
      () => ({ valuations: updatedValuations }),
      () => { if (this.props.onChange) this.props.onChange(updatedValuations) }
    )
  }

  handleAddValuation(): void {
    const updatedValuations = this.state.valuations || []
    updatedValuations.push({ date: moment().format(DateFormat), note: '' })
    this.setState(
      () => ({ valuations: updatedValuations }),
      () => { if (this.props.onChange) this.props.onChange(updatedValuations) }
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

  componentWillReceiveProps(props: Props) {
    this.setState(() => ({ valuations: props.valuations }))
  }

  componentDidMount() { this.setFocus() }

  componentDidUpdate() { this.setFocus() }

  render() {
    const valuations = this.state.valuations === undefined
      ? []
      : this.state.valuations.map((v, i) => {
        return <tr key={i}>
          <td className='valuations-date'>
            <DatePicker name={`valuations-date-${i}`} dateFormat={DateFormat}
              selected={moment(v.date, DateFormat)}
              showYearDropdown
              autoFocus={this.props.focus === `valuations-date-${i}`}
              onChange={(moment) => this.handleChange(i, 'date', moment.format(DateFormat))}
              onFocus={this.handleFocus} />
          </td>
          <td className='valuations-amount'>
            <input name={`valuations-amount-${i}`} type='number'
              value={v.amount ? v.amount.toString() : ''} placeholder='Value'
              onChange={(event) => this.handleChange(i, 'amount', parseInt(event.target.value, 10))}
              ref={input => this._refs[`valuations-amount-${i}`] = input}
              onFocus={this.handleFocus} />
          </td>
          <td className='valuations-note'>
            <input name={`valuations-note-${i}`} type='text'
              value={v.note} placeholder='Note'
              onChange={(event) => this.handleChange(i, 'note', event.target.value)}
              ref={input => this._refs[`valuations-note-${i}`] = input}
              onFocus={this.handleFocus} />
          </td>
        </tr>
      })
    return (
      <div className='valuations-input control-group'>
        <table className='table'>
          <tbody>{valuations}</tbody>
        </table>
        <button className='button add-valuation-button' type='button' onClick={this.handleAddValuation}>+&nbsp;&nbsp;Add</button>
      </div>
    )
  }
}

export default ValuationsInput
