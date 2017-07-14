import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import './styles/Breadcrumbs.css'

class Breadcrumbs extends React.Component {
  render() {
    const breadcrumbLinks = _.map(this.props.breadcrumbs, (breadcrumb, i) => {
      return (
        <li className='breadcrumbs-item' key={i}>
          <Link className='breadcrumbs-link' to={breadcrumb.path}>
            {breadcrumb.display}
          </Link>
        </li>
      )
    })
    return (
      <div className='breadcrumbs'>
        <ul className='breadcrumbs-list'>
          {breadcrumbLinks}
        </ul>
      </div>
    )
  }
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string,
      path: PropTypes.string,
    })
  ),
}

export default Breadcrumbs
