// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import './ValuationsInput.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

type Valuation = {
  date?: string,
  amount?: number,
  note?: string
}

export type Valuations = Array<Valuation>

export const ValuationsEmpty = []

type Props = {
  name: string,
  value: Valuations,
  focus?: string,
  onChange?: (valuations: Valuations) => void,
  onFocus?: (fieldName: string) => void
}

type State = {
  value: Valuations
}

class ValuationsInput extends React.Component {
  props: Props
  state: State
  _refs: { [fieldName: string]: HTMLInputElement }
  handleChange: (i: number, field: string, value: string|number) => void
  handleFocus: (event: Event) => true
  handleAddValuation: (event: Event) => true

  constructor(props: Props) {
    super(props)
    this.state = { value: this.props.value }

    this.handleChange = (i, field, value) => {
      const newState = this.state
      newState.value[i][field] = value
      this.setState(newState)
      if (this.props.onChange) this.props.onChange(newState.value)
    }

    this.handleAddValuation = (event) => {
      const newState = this.state
      newState.value.push({ date: moment().format('YYYY-MM-DD'), note: '' })
      this.setState(newState)
      if (this.props.onChange) this.props.onChange(newState.value)
      return true
    }

    this.handleFocus = (event: Event) => {
      const target = event.target
      if (this.props.onFocus && target instanceof HTMLInputElement) {
        this.props.onFocus(target.name)
      }
      return true
    }

    this._refs = {}
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ value: props.value })
  }

  setFocus() {
    if (this.props.focus && this._refs[this.props.focus]) {
      this._refs[this.props.focus].focus()
    }
  }
  componentDidMount() { this.setFocus() }
  componentDidUpdate() { this.setFocus() }

  render() {
    const valuations = this.state.value.map((v, i) => {
      return <tr key={i}>
        <td className='valuations-date'>
          <DatePicker name={`valuations-date-${i}`} dateFormat='YYYY-MM-DD'
            selected={moment(v.date, 'YYYY-MM-DD')}
            onChange={(moment) => this.handleChange(i, 'date', moment.format('YYYY-MM-DD'))}
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
