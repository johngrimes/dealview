import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import pick from 'lodash.pick'

import Breadcrumbs from './Breadcrumbs.js'
import BalanceSheetChart from './BalanceSheetChart.js'
import DateSlider from './DateSlider.js'
import {
  loadBalanceSheet,
  updateBalanceSheet,
} from '../actions/balanceSheet.js'
import { DateStorageFormat, formatDollars } from '../data/commonTypes.js'

import './styles/Portfolio.css'

export class Portfolio extends React.Component {
  static propTypes = {
    assets: PropTypes.shape({
      status: PropTypes.oneOf([ 'uninitialised', 'loading', 'loaded', 'error' ]),
      objects: PropTypes.objectOf(PropTypes.object),
    }),
    balanceSheet: PropTypes.shape({
      status: PropTypes.oneOf([ 'uninitialised', 'loading', 'loaded', 'error' ]),
      balanceSheet: PropTypes.objectOf(PropTypes.object),
    }),
  }

  constructor(props) {
    const { assets, liabilities, balanceSheet, dispatch } = props
    super(props)
    this.state = {}
    if (balanceSheet.fresh === false) {
      const today = moment().startOf('day')
      dispatch(
        updateBalanceSheet(
          assets.objects,
          liabilities.objects,
          today.format(DateStorageFormat),
          today.add(10, 'years').format(DateStorageFormat)
        )
      )
    } else if (balanceSheet.status === 'uninitialised') {
      dispatch(loadBalanceSheet())
    } else {
      const date = Portfolio.defaultDateSelection(balanceSheet.balanceSheet)
      this.state = {
        date,
        balanceSheetAtDate: balanceSheet.balanceSheet[date],
      }
    }

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  breadcrumbs() {
    return [{ display: 'Portfolio', path: '/portfolio' }]
  }

  handleDateChange(date) {
    this.setState(() => ({
      date,
      balanceSheetAtDate: this.props.balanceSheet.balanceSheet[date],
    }))
  }

  componentWillReceiveProps(props) {
    let updatedState = pick(this.state, 'date')
    if (props.balanceSheet.status === 'loaded' && !this.state.date) {
      updatedState = {
        ...updatedState,
        date: Portfolio.defaultDateSelection(props.balanceSheet.balanceSheet),
      }
    }
    updatedState = {
      ...updatedState,
      balanceSheetAtDate: props.balanceSheet.balanceSheet[updatedState.date],
    }
    this.setState(() => updatedState)
  }

  render() {
    const { balanceSheet } = this.props
    const { date, balanceSheetAtDate } = this.state
    const dates =
      typeof balanceSheet.balanceSheet === 'object'
        ? Object.keys(balanceSheet.balanceSheet)
        : []

    return (
      <div className='portfolio'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <BalanceSheetChart balanceSheet={balanceSheet.balanceSheet} />
        <div className='slider-container'>
          <DateSlider
            dates={dates}
            selected={date}
            initialised={balanceSheet.status === 'loaded' && dates.length > 0}
            className='date-slider'
            onChange={this.handleDateChange}
          />
        </div>
        <div className='balance-sheet'>
          <div className='assets'>
            <Link to='/portfolio/assets'>Assets</Link>
            <span className='assets-total'>
              {balanceSheetAtDate
                ? formatDollars(balanceSheetAtDate.totalAssets)
                : '?'}
            </span>
          </div>
          <div className='liabilities'>
            <Link to='/portfolio/liabilities'>Liabilities</Link>
            <span className='liabilities-total'>
              {balanceSheetAtDate
                ? formatDollars(balanceSheetAtDate.totalLiabilities)
                : '?'}
            </span>
          </div>
          <div className='equity'>
            <span>Equity</span>
            <span className='equity-total'>
              {balanceSheetAtDate
                ? formatDollars(balanceSheetAtDate.equity)
                : '?'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  static defaultDateSelection(balanceSheet) {
    const today = moment().startOf('day').format(DateStorageFormat)
    const dates = Object.keys(balanceSheet)
    const todayIndex = dates.indexOf(today)
    return todayIndex !== -1
      ? dates[todayIndex]
      : dates[Math.floor(dates.length / 2)]
  }
}

const mapStateToProps = state => {
  return {
    assets: state.assets,
    liabilities: state.liabilities,
    balanceSheet: state.balanceSheet,
  }
}

export default connect(mapStateToProps)(Portfolio)
