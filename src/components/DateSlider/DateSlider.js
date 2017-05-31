// @flow

import React from 'react'
// import ReactSlider from 'react-slider'

import 'components/DateSlider/DateSlider.css'

type Props = {
  dates: string[],
}

class DateSlider extends React.Component {
  props: Props

  render() {
    return (
      <input className='slider' type='range' min='0' max={this.props.dates.length - 1} defaultValue={0} />
    )
  }
}

export default DateSlider
