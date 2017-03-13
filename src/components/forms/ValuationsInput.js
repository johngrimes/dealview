// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import InputField from '../../components/forms/InputField.js'

import './ValuationsInput.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

type Valuation = {
  date: string,
  amount: number,
  note: string
}

export type Valuations = Array<Valuation>

export const ValuationsEmpty = []

type Props = {
  name: string,
  value: Valuations,
  notifyChange?: (valuations: Valuations) => void
}

type State = {
  value: Valuations
}

class ValuationsInput extends React.Component {
  props: Props
  state: State
  handleChange: (i: number, field: string, value: string|number) => void
  handleAddValuation: (event: Event) => true

  constructor(props: Props) {
    super(props)
    this.state = { value: this.props.value }

    this.handleChange = (i, field, value) => {
      const newState = this.state
      newState.value[i][field] = value
      this.setState(newState)
      if (this.props.notifyChange) this.props.notifyChange(newState.value)
    }

    this.handleAddValuation = (event) => {
      const newState = this.state
      newState.value.push({ date: '1983-06-21', amount: 1, note: 'Some note' })
      this.setState(newState)
      if (this.props.notifyChange) this.props.notifyChange(newState.value)
      return true
    }
  }

  render() {
    const valuations = this.state.value.map((v, i) => {
      return <tr key={i}>
        <td><DatePicker name={`valuations-date-${i}`} dateFormat='YYYY-MM-DD' selected={moment(v.date, 'YYYY-MM-DD')}
          onChange={(value) => this.handleChange(i, 'date', value.format('YYYY-MM-DD'))} /></td>
        <td><InputField name={`valuations-amount-${i}`} type='number' value={v.amount.toString()}
          notifyChange={(value) => this.handleChange(i, 'amount', parseInt(value, 10))} /></td>
        <td><InputField name={`valuations-note-${i}`} type='text' value={v.note}
          notifyChange={(value) => this.handleChange(i, 'note', value)} /></td>
      </tr>
    })
    const header = valuations.length > 0 ? <thead>
      <tr>
        <th>Date</th>
        <th>Amount</th>
        <th>Note</th>
      </tr>
    </thead> : null
    return (
      <div className='valuations-input control-group'>
        <table className='table'>
          {header}
          <tbody>{valuations}</tbody>
        </table>
        <button className='button add-valuation-button' type='button' onClick={this.handleAddValuation}>+&nbsp;&nbsp;Add</button>
      </div>
    )
  }
}

export default ValuationsInput
