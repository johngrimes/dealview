// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { DateFormat } from '../../data/commonTypes.js'

import './ValuationsInput.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export type Valuation = {
  date?: string,
  amount?: number,
  note?: string
}
export const ValuationDefault = {
  date: moment().format(DateFormat),
  note: ''
}
export type Valuations = Valuation[]

type Props = {
  name: string,
  valuations: Valuations,
  focus?: string,
  onChange?: (valuations: Valuations) => void,
  onFocus?: (fieldName: string) => void
}

type State = {
  valuations: Valuations
}

class ValuationsInput extends React.Component {
  props: Props
  state: State
  _refs: { [fieldName: string]: HTMLInputElement }
  handleChange: (i: number, field: string, value: string|number) => void
  handleAddValuation: (event: Event) => true
  handleFocus: (event: Event) => true
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
    const updatedValuations = this.state.valuations
    updatedValuations[i][field] = value
    this.setState({
      valuations: updatedValuations
    })
    if (this.props.onChange) this.props.onChange(updatedValuations)
  }

  handleAddValuation(event: Event): true {
    const updatedValuations = this.state.valuations
    updatedValuations.push({ date: moment().format(DateFormat), note: '' })
    this.setState({
      valuations: updatedValuations
    })
    if (this.props.onChange) this.props.onChange(updatedValuations)
    return true
  }

  handleFocus(event: Event): true {
    const target = event.target
    if (this.props.onFocus && target instanceof HTMLInputElement) {
      this.props.onFocus(target.name)
    }
    return true
  }

  setFocus(): void {
    if (this.props.focus && this._refs[this.props.focus]) {
      this._refs[this.props.focus].focus()
    }
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ valuations: props.valuations })
  }

  componentDidMount() { this.setFocus() }

  componentDidUpdate() { this.setFocus() }

  render() {
    const valuations = this.state.valuations.map((v, i) => {
      return <tr key={i}>
        <td className='valuations-date'>
          <DatePicker name={`valuations-date-${i}`} dateFormat={DateFormat}
            selected={moment(v.date, DateFormat)}
            onChange={(moment) => this.handleChange(i, 'date', moment.format(DateFormat))}
            onFocus={this.handleFocus} />
        </td>
        <td className='valuations-amount'>
          <input name={`valuations-amount-${i}`} type='number'
            value={v.amount ? v.amount.toString() : ''} placeholder='Value'
            onChange={(event) => this.handleChange(i, 'amount', parseInt(event.target.value, 10))}
            onFocus={this.handleFocus} />
        </td>
        <td className='valuations-note'>
          <input name={`valuations-note-${i}`} type='text'
            value={v.note} placeholder='Note'
            onChange={(event) => this.handleChange(i, 'note', event.target.value)}
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
