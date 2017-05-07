// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import type { GlobalState } from '../store.js'

class Portfolio extends React.Component {
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
    assets: state.assets
  }
}

export default connect(mapStateToProps)(Portfolio)
