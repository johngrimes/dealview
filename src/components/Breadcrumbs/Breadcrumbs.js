// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import 'components/Breadcrumbs/Breadcrumbs.css'

type Breadcrumb = {
  +display: string,
  +path: string
}
export type BreadcrumbTrail = Breadcrumb[]

type Props = {
  +breadcrumbs: BreadcrumbTrail
}

class Breadcrumbs extends React.Component {
  props: Props

  render() {
    const breadcrumbLinks = _.map(this.props.breadcrumbs, (breadcrumb, i) => {
      return <li className='breadcrumbs-item' key={i}>
        <Link className='breadcrumbs-link' to={breadcrumb.path}>
          {breadcrumb.display}
        </Link>
      </li>
    })
    return <div className='breadcrumbs'>
      <ul className='breadcrumbs-list'>
        {breadcrumbLinks}
      </ul>
    </div>
  }
}

export default Breadcrumbs
