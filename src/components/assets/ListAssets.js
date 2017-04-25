// @flow

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import type { Dispatch } from 'redux'
import { Link } from 'react-router-dom'

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.js'
import { loadAssets } from '../../actions/assets.js'
import type { GlobalState } from '../../store.js'
import type { AssetState } from '../../reducers/assets.js'
import type { BreadcrumbTrail } from '../Breadcrumbs/Breadcrumbs.js'

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
      { display: 'Assets', path: '/portfolio/assets' }
    ]
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.assets.status === 'uninitialised') {
      this.props.dispatch(loadAssets())
    }
  }

  render() {
    const assets = _.map(this.props.assets.objects, (v, k) => {
      const lastValuation = v.lastValuation ? <div className='asset-last-valuation'>{v.lastValuation}</div> : null
      return <li key={k} className='asset'>
        <Link className='asset-name' to={`/portfolio/assets/real-estate/${v.instanceId}`}>{v.name}</Link>
        {lastValuation}
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
    assets: state.assets
  }
}

export default connect(mapStateToProps)(ListAssets)
