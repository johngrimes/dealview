// @flow

import React from 'react'
import type { Children } from 'react'

import type { Breadcrumb } from './Breadcrumbs/Breadcrumbs.js'

type Props = {
  children: Children
}

class Portfolio extends React.Component {
  props: Props

  static breadcrumb(): Breadcrumb {
    return {
      display: 'Portfolio',
      path: 'portfolio'
    }
  }

  render() {
    if (this.props.children) {
      return (
        <div className='portfolio'>
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div className='portfolio'>
          <h1>Portfolio</h1>
        </div>
      )
    }
  }
}

export default Portfolio
