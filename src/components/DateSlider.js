import React from 'react'
import PropTypes from 'prop-types'
import ReactSlider from 'react-slider'
import throttle from 'lodash.throttle'

import './styles/DateSlider.css'

class DateSlider extends React.Component {
  static propTypes = {
    dates: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string,
    initialised: PropTypes.bool.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)

    const selectedIndex = props.dates.indexOf(props.selected)
    this.state = {
      selected: props.selected,
      selectedIndex: selectedIndex !== -1 ? selectedIndex : 0,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChangeUnthrottled(value) {
    const selectedIndex = parseInt(value, 10)
    const selected = this.props.dates[selectedIndex]
    this.setState(
      () => ({ selectedIndex, selected }),
      () => {
        if (this.props.onChange) this.props.onChange(selected)
      }
    )
  }
  handleChange = throttle(this.handleChangeUnthrottled, 100)

  componentWillReceiveProps(props) {
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
      <div
        className={
          initialised ? 'date-slider' : 'date-slider date-slider-uninitialised'
        }
      >
        <div className='date-tag start-date'>
          {dates[0]}
        </div>
        <div className='date-tag end-date'>
          {dates[dates.length - 1]}
        </div>
        <ReactSlider
          className={className ? `slider ${className}` : className}
          min={0}
          max={dates.length - 1}
          defaultValue={0}
          value={selectedIndex}
          onChange={this.handleChange}
        >
          <div className='date-tag selected-date'>
            {selected}
          </div>
        </ReactSlider>
      </div>
    )
  }
}

export default DateSlider
