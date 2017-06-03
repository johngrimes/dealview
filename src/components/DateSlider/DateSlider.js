// @flow

import React from 'react'
import ReactSlider from 'react-slider'

import 'components/DateSlider/DateSlider.css'

type Props = {
  +dates: string[],
  +className?: string,
  +onChange?: (value: string) => void,
}
type State = {
  +selected: string,
  +selectedIndex: number,
}

class DateSlider extends React.Component {
  props: Props
  state: State
  handleChange: (value: string) => void

  constructor(props: Props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      selected: props.dates[0],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value: string): void {
    const selectedIndex = parseInt(value)
    const selected = this.props.dates[selectedIndex]
    this.setState(
      () => ({ selectedIndex, selected }),
      () => { if (this.props.onChange) this.props.onChange(selected) }
    )
  }

  render() {
    const { dates, className } = this.props
    const { selected } = this.state
    return (
      <div>
        <div className='date-tag start-date'>{dates[0]}</div>
        <div className='date-tag end-date'>{dates[dates.length - 1]}</div>
        <ReactSlider className={className ? `slider ${className}` : className}
          min={0} max={dates.length - 1} defaultValue={0}
          onChange={this.handleChange}>
          <div className='date-tag selected-date'>{selected}</div>
        </ReactSlider>
      </div>
    )
  }
}

export default DateSlider
