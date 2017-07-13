import React from 'react'

import InputField from './InputField.js'
import {
  parseNumber,
  formatDollars,
  unformatDollars,
} from '../data/commonTypes.js'

class CurrencyField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: parseNumber(props.value),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    const raw = unformatDollars(value)
    this.setState(
      () => ({ value: raw }),
      () => {
        if (this.props.onChange) this.props.onChange(raw)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({ value: parseNumber(nextProps.value) }))
  }

  render() {
    const value = formatDollars(this.state.value)
    const props = {
      ...this.props,
      value,
      type: 'text',
      onChange: this.handleChange,
    }

    return <InputField {...props} />
  }
}

export default CurrencyField
