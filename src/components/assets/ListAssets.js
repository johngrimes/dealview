// @flow

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import type { Dispatch } from 'redux'

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { loadAssets } from 'actions/assets'
import { getValuationAtDate } from 'types/assets/asset'
import { DateFormat, formatDollars } from 'types/commonTypes'
import type { GlobalState } from 'store'
import type { AssetState } from 'reducers/assets'
import type { BreadcrumbTrail } from 'components/Breadcrumbs/Breadcrumbs'

type Props = {
  assets: AssetState,
  breadcrumbs: BreadcrumbTrail,
  dispatch: Dispatch
}

export class ListAssets extends React.Component {
  props: Props

  constructor(props: Props) {
    super(props)
    if (this.props.assets.status === 'uninitialised') {
      this.props.dispatch(loadAssets())
    }
  }

  breadcrumbs(): BreadcrumbTrail {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
    ]
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.assets.status === 'uninitialised') {
      this.props.dispatch(loadAssets())
    }
  }

  render() {
    const assets = _.map(this.props.assets.objects, (v, k) => {
      const lastValuation = getValuationAtDate(v, moment().format(DateFormat))
      const lastValuationTag = lastValuation === 0
        ? null
        : <div className='asset-last-valuation'>{formatDollars(lastValuation)}</div>
      return <li key={k} className='asset'>
        <Link className='asset-name' to={`/portfolio/assets/real-estate/${v.id}`}>{v.name}</Link>
        {lastValuationTag}
      </li>
    })
    return (
      <div className='list-assets'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <p><Link to='/portfolio/assets/new'>New Asset</Link></p>
        <ol className='assets'>
          {assets}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    assets: state.assets,
  }
}

export default connect(mapStateToProps)(ListAssets)
