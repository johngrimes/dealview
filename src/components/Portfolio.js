// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import { loadBalanceSheet } from 'actions/balanceSheet'
import type { GlobalState } from 'store'
import type { AssetState } from 'reducers/assets'
import type { BalanceSheetState } from 'reducers/balanceSheet'

type Props = {
  assets: AssetState,
  balanceSheet: BalanceSheetState,
  dispatch: Dispatch
}
type State = {
  date: string,
}

class Portfolio extends React.Component {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    if (this.props.assets.status === 'uninitialised') {
      this.props.dispatch(loadBalanceSheet())
    }
  }
  render() {
    return (
      <div className='portfolio'>
        <Link to='/portfolio/assets'>Assets</Link>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    assets: state.assets,
    balanceSheet: state.balanceSheet,
  }
}

export default connect(mapStateToProps)(Portfolio)
