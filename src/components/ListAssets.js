import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Breadcrumbs from './Breadcrumbs.js'
import RealEstateActions from '../actions/assets.js'
import { getValuationAtDate } from '../data/asset.js'
import { formatDollars } from '../data/commonTypes.js'

export class ListAssets extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.assets.status === 'uninitialised') {
      this.props.dispatch(RealEstateActions.loadAssets())
    }
  }

  breadcrumbs() {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
    ]
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assets.status === 'uninitialised') {
      this.props.dispatch(RealEstateActions.loadAssets())
    }
  }

  render() {
    const assets = _.map(this.props.assets.objects, (v, k) => {
      const lastValuation = getValuationAtDate(v, moment())
      const lastValuationTag =
        lastValuation === 0
          ? null
          : <div className='asset-last-valuation'>
              {formatDollars(lastValuation)}
            </div>
      return (
        <li key={k} className='asset'>
          <Link
            className='asset-name'
            to={`/portfolio/assets/real-estate/${v.id}`}
          >
            {v.name}
          </Link>
          {lastValuationTag}
        </li>
      )
    })
    return (
      <div className='list-assets'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <p>
          <Link to='/portfolio/assets/new'>New Asset</Link>
        </p>
        <ol className='assets'>
          {assets}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => ({ assets: state.assets })

export default connect(mapStateToProps)(ListAssets)
