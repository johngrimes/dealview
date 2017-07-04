// @flow

import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { loadBalanceSheet, updateBalanceSheet } from 'actions/balanceSheet'
import { DateStorageFormat, formatDollars } from 'types/commonTypes'
import DateSlider from 'components/DateSlider/DateSlider'
import type { GlobalState } from 'store'
import type { AssetState } from 'reducers/assets/assets'
import type { BalanceSheetState } from 'reducers/balanceSheet'
import type { BalanceSheetOverTime } from 'types/balanceSheet'
import type { BreadcrumbTrail } from 'components/Breadcrumbs/Breadcrumbs'

import 'components/Portfolio/Portfolio.css'

type Props = {
  +assets: AssetState,
  +balanceSheet: BalanceSheetState,
  +dispatch: any
}
type State = {
  +date?: string,
}

export class Portfolio extends React.Component {
  props: Props
  state: State
  handleDateChange: (date: string) => void

  constructor(props: Props) {
    super(props)
    this.state = {}
    if (this.props.balanceSheet.fresh === false) {
      this.props.dispatch(
        updateBalanceSheet(this.props.assets.objects, {}, '2017-05-28', '2027-05-28')
      )
    } else if (this.props.balanceSheet.status === 'uninitialised') {
      this.props.dispatch(loadBalanceSheet())
    } else {
      this.state = {
        date: Portfolio.defaultDateSelection(this.props.balanceSheet.balanceSheet),
      }
    }

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  breadcrumbs(): BreadcrumbTrail {
    return [
      { display: 'Portfolio', path: '/portfolio' },
    ]
  }

  handleDateChange(date: string): void {
    this.setState(() => ({ date }))
  }

  componentWillReceiveProps(props: Props) {
    if (props.balanceSheet.status === 'loaded' && !this.state.date) {
      this.setState(() => ({
        date: Portfolio.defaultDateSelection(props.balanceSheet.balanceSheet),
      }))
    }
  }

  render() {
    const balanceSheet = this.state.date && (typeof this.props.balanceSheet.balanceSheet === 'object')
      ? this.props.balanceSheet.balanceSheet[this.state.date]
      : undefined
    const dates = typeof this.props.balanceSheet.balanceSheet === 'object'
      ? Object.keys(this.props.balanceSheet.balanceSheet)
      : []

    return (
      <div className='portfolio'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <div className='slider-container'>
          <DateSlider dates={dates} selected={this.state.date}
            initialised={this.props.balanceSheet.status === 'loaded'}
            className='date-slider' onChange={this.handleDateChange} />
        </div>
        <div className='balance-sheet'>
          <div className='assets'>
            <Link to='/portfolio/assets'>Assets</Link>
            <span className='assets-total'>{balanceSheet ? formatDollars(balanceSheet.totalAssets) : '?'}</span>
          </div>
          <div className='liabilities'>
            <Link to='/portfolio/liabilities'>Liabilities</Link>
            <span className='assets-total'>{balanceSheet ? formatDollars(balanceSheet.totalLiabilities) : '?'}</span>
          </div>
          <div className='equity'>
            <span>Equity</span>
            <span className='equity-total'>{balanceSheet ? formatDollars(balanceSheet.equity) : '?'}</span>
          </div>
        </div>
      </div>
    )
  }

  static defaultDateSelection(balanceSheet: BalanceSheetOverTime): string {
    const today = moment().format(DateStorageFormat)
    const dates = Object.keys(balanceSheet)
    const todayIndex = dates.indexOf(today)
    return todayIndex !== -1
      ? dates[todayIndex]
      : dates[Math.floor(dates.length / 2)]
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    assets: state.assets,
    balanceSheet: state.balanceSheet,
  }
}

export default connect(mapStateToProps)(Portfolio)
