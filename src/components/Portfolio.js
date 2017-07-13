import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Breadcrumbs from './Breadcrumbs.js'
import DateSlider from './DateSlider.js'
import { loadBalanceSheet, updateBalanceSheet } from '../actions/balanceSheet.js'
import { DateStorageFormat, formatDollars } from '../data/commonTypes.js'

import './styles/Portfolio.css'

export class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    if (this.props.balanceSheet.fresh === false) {
      this.props.dispatch(updateBalanceSheet(this.props.assets.objects, {}, '2017-05-28', '2027-05-28'))
    } else if (this.props.balanceSheet.status === 'uninitialised') {
      this.props.dispatch(loadBalanceSheet())
    } else {
      this.state = {
        date: Portfolio.defaultDateSelection(this.props.balanceSheet.balanceSheet),
      }
    }

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  breadcrumbs() {
    return [{ display: 'Portfolio', path: '/portfolio' }]
  }

  handleDateChange(date) {
    this.setState(() => ({ date }))
  }

  componentWillReceiveProps(props) {
    if (props.balanceSheet.status === 'loaded' && !this.state.date) {
      this.setState(() => ({
        date: Portfolio.defaultDateSelection(props.balanceSheet.balanceSheet),
      }))
    }
  }

  render() {
    const balanceSheet =
      this.state.date && typeof this.props.balanceSheet.balanceSheet === 'object'
        ? this.props.balanceSheet.balanceSheet[this.state.date]
        : undefined
    const dates =
      typeof this.props.balanceSheet.balanceSheet === 'object' ? Object.keys(this.props.balanceSheet.balanceSheet) : []

    return (
      <div className='portfolio'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <div className='slider-container'>
          <DateSlider
            dates={dates}
            selected={this.state.date}
            initialised={this.props.balanceSheet.status === 'loaded' && dates.length > 0}
            className='date-slider'
            onChange={this.handleDateChange}
          />
        </div>
        <div className='balance-sheet'>
          <div className='assets'>
            <Link to='/portfolio/assets'>Assets</Link>
            <span className='assets-total'>
              {balanceSheet ? formatDollars(balanceSheet.totalAssets) : '?'}
            </span>
          </div>
          <div className='liabilities'>
            <Link to='/portfolio/liabilities'>Liabilities</Link>
            <span className='assets-total'>
              {balanceSheet ? formatDollars(balanceSheet.totalLiabilities) : '?'}
            </span>
          </div>
          <div className='equity'>
            <span>Equity</span>
            <span className='equity-total'>
              {balanceSheet ? formatDollars(balanceSheet.equity) : '?'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  static defaultDateSelection(balanceSheet) {
    const today = moment().format(DateStorageFormat)
    const dates = Object.keys(balanceSheet)
    const todayIndex = dates.indexOf(today)
    return todayIndex !== -1 ? dates[todayIndex] : dates[Math.floor(dates.length / 2)]
  }
}

const mapStateToProps = state => ({
  assets: state.assets,
  balanceSheet: state.balanceSheet,
})

export default connect(mapStateToProps)(Portfolio)
