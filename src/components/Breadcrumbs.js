import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import map from 'lodash.map'

import './styles/Breadcrumbs.css'

class Breadcrumbs extends React.Component {
  static propTypes = {
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        display: PropTypes.string,
        path: PropTypes.string,
      })
    ),
  }

  render() {
    const breadcrumbLinks = map(this.props.breadcrumbs, (breadcrumb, i) => {
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

export default Breadcrumbs
