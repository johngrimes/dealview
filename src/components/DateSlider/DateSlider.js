// @flow

import React from 'react'
// import ReactSlider from 'react-slider'

import 'components/DateSlider/DateSlider.css'

type Props = {
  dates: string[],
  className?: string,
  onChange?: (value: string) => void,
}
type State = {
  selected: string,
  selectedIndex: number,
}

class DateSlider extends React.Component {
  props: Props
  state: State
  handleChange: (event: { target: { value: string } }) => void

  constructor(props: Props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      selected: props.dates[0],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: { target: { value: string } }): void {
    const selectedIndex = parseInt(event.target.value)
    const selected = this.props.dates[selectedIndex]
    this.setState(
      () => ({ selectedIndex, selected }),
      () => { if (this.props.onChange) this.props.onChange(selected) }
    )
  }

  render() {
    const { dates, className } = this.props
    return (
      <input className={className ? `slider ${className}` : className}
        type='range' min='0' max={dates.length - 1} defaultValue={0}
        onChange={this.handleChange} />
    )
  }
}

export default DateSlider
