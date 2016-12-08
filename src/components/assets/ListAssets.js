// @flow

import React from 'react'
import type { Children } from 'react'

import type { Breadcrumb } from '../Breadcrumbs/Breadcrumbs.js'

type Props = {
  children: Children
}

class ListAssets extends React.Component {
  props: Props

  static breadcrumb(): Breadcrumb {
    return {
      display: 'Assets',
      path: 'assets'
    }
  }

  render() {
    if (this.props.children) {
      return (
        <div className='list-assets'>
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div className='list-assets'>
          <h1>List Assets</h1>
        </div>
      )
    }
  }
}

export default ListAssets
