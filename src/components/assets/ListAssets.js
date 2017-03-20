// @flow

import React from 'react'

import { loadAll } from '../../data/assets/asset.js'
import type { AssetValues } from '../../data/assets/asset.js'

type State = {
  assets: AssetValues[]
}

class ListAssets extends React.Component {
  state: State

  constructor() {
    super()
    this.state = { assets: [] }
    loadAll().then(result => {
      this.setState({ assets: result })
    })
  }

  render() {
    const assets = this.state.assets.map((v, i) => {
      const lastValuation = v.lastValuation ? <div className='asset-last-valuation'>{v.lastValuation}</div> : null
      return <li key={i} className='asset'>
        <div className='asset-name'>{v.name}</div>
        {lastValuation}
      </li>
    })
    return (
      <div className='list-assets'>
        <ol className='assets'>
          {assets}
        </ol>
      </div>
    )
  }
}

export default ListAssets
