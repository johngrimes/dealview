// @flow

import React from 'react'
import ReactSlider from 'react-slider'

import 'components/DateSlider/DateSlider.css'

type Props = {
  +dates: string[],
  +selected: string,
  +initialised: boolean,
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

    const selectedIndex = props.dates.indexOf(props.selected)
    this.state = {
      selected: props.selected,
      selectedIndex: selectedIndex !== -1 ? selectedIndex : 0,
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

  componentWillReceiveProps(props: Props) {
    const selectedIndex = props.dates.indexOf(props.selected)
    this.setState(() => ({
      selected: props.selected,
      selectedIndex: selectedIndex !== -1 ? selectedIndex : 0,
    }))
  }

  render() {
    const { dates, className, initialised } = this.props
    const { selected, selectedIndex } = this.state
    return (
      <div className={initialised ? 'date-slider' : 'date-slider date-slider-uninitialised'}>
        <div className='date-tag start-date'>{dates[0]}</div>
        <div className='date-tag end-date'>{dates[dates.length - 1]}</div>
        <ReactSlider className={className ? `slider ${className}` : className}
          min={0} max={dates.length - 1} defaultValue={0}
          value={selectedIndex}
          onChange={this.handleChange}>
          <div className='date-tag selected-date'>{selected}</div>
        </ReactSlider>
      </div>
    )
  }
}

export default DateSlider
