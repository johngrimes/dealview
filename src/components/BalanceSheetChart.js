import React from 'react'
import PropTypes from 'prop-types'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import keys from 'lodash.keys'
import filter from 'lodash.filter'
import pick from 'lodash.pick'
import map from 'lodash.map'
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
    const dates = keys(data)
    const interval = Math.ceil(dates.length / 200) // TODO: Convert 100 into a prop
    const filteredDates = filter(dates, (_, i) => i % interval === 0)
    const filteredData = pick(data, filteredDates)
    return map(filteredData, (v, k) => ({
      Assets: v.totalAssets,
      Liabilities: v.totalLiabilities,
      Equity: v.equity,
      Date: moment(k, DateStorageFormat).format(DateDisplayFormat),
    }))
  }

  render() {
    const data = this.processedData()
    return (
      <div className='balance-sheet-chart'>
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart data={data}>
            <Area type='monotone' dataKey='Assets' />
            <Area type='monotone' dataKey='Liabilities' fill='red' />
            <XAxis dataKey='Date' />
            <YAxis tickFormatter={tick => formatDollars(tick)} />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip formatter={x => formatDollars(x)} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default BalanceSheetChart
