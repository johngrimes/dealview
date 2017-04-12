// @flow

import React from 'react'
import { Link } from 'react-router-dom'

class Portfolio extends React.Component {
  render() {
    return (
      <div className='portfolio'>
        <Link to='/portfolio/assets'>Assets</Link>
      </div>
    )
  }
}

export default Portfolio
