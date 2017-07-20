import React from 'react'
import PropTypes from 'prop-types'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import _ from 'lodash'
import moment from 'moment'

import {
  DateStorageFormat,
  DateDisplayFormat,
  formatDollars,
} from '../data/commonTypes.js'

import './styles/BalanceSheetChart.css'

class BalanceSheetChart extends React.Component {
  static propTypes = {
    balanceSheet: PropTypes.shape({
      status: PropTypes.oneOf([ 'uninitialised', 'loading', 'loaded', 'error' ]),
      objects: PropTypes.objectOf(PropTypes.object),
    }),
  }

  processedData() {
    const data = this.props.balanceSheet
    const dates = _.keys(data)
    const interval = Math.ceil(dates.length / 100) // TODO: Convert 100 into a prop
    const filteredDates = _.filter(dates, (_, i) => i % interval === 0)
    const filteredData = _.pick(data, filteredDates)
    return _.map(filteredData, (v, k) => ({
      ...v,
      date: moment(k, DateStorageFormat).format(DateDisplayFormat),
    }))
  }

  render() {
    const data = this.processedData()
    return (
      <AreaChart data={data} width={900} height={400}>
        <Area type='monotone' dataKey='totalAssets' />
        <XAxis dataKey='date' />
        <YAxis
          dataKey='totalAssets'
          tickFormatter={tick => formatDollars(tick)}
        />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip
          formatter={x => {
            console.log(x)
            return x
          }}
        />
      </AreaChart>
    )
  }
}

// class DollarLabel extends React.Component {
//   render() {
//     const { x, y, payload } = this.props
//     return (
//       <text x={x} y={y}>
//         {formatDollars(payload.value)}
//       </text>
//     )
//   }
// }

export default BalanceSheetChart
