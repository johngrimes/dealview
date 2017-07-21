import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import Breadcrumbs from './Breadcrumbs.js'
import LiabilityActions from '../actions/liabilities.js'

export class ListLiabilities extends React.Component {
  static propTypes = {
    liabilities: PropTypes.shape({
      status: PropTypes.oneOf([ 'uninitialised', 'loading', 'loaded', 'error' ]),
      objects: PropTypes.objectOf(PropTypes.object),
    }),
  }

  constructor(props) {
    super(props)
    if (this.props.liabilities.status === 'uninitialised') {
      this.props.dispatch(LiabilityActions.loadLiabilities())
    }
  }

  breadcrumbs() {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Liabilities', path: '/portfolio/liabilities' },
    ]
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.liabilities.status === 'uninitialised') {
      this.props.dispatch(LiabilityActions.loadLiabilities())
    }
  }

  render() {
    const liabilities = _.map(this.props.liabilities.objects, (v, k) =>
      <li key={k} className='liability'>
        <Link
          className='liability-name'
          to={`/portfolio/liabilities/loans/${v.id}`}
        >
          {v.name}
        </Link>
      </li>
    )
    return (
      <div className='list-liabilities'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <p>
          <Link to='/portfolio/liabilities/new'>New Liability</Link>
        </p>
        <ol className='liabilities'>
          {liabilities}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => ({ liabilities: state.liabilities })

export default connect(mapStateToProps)(ListLiabilities)
