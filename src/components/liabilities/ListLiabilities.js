// @flow

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import RealEstateActions from 'actions/liabilities/liabilities'
import type { GlobalState } from 'store'
import type { LiabilityState } from 'reducers/liabilities/liabilities'
import type { BreadcrumbTrail } from 'components/Breadcrumbs/Breadcrumbs'

type Props = {
  +liabilities: LiabilityState,
  +breadcrumbs: BreadcrumbTrail,
  +dispatch: any
}

export class ListLiabilities extends React.Component {
  props: Props

  constructor(props: Props) {
    super(props)
    if (this.props.liabilities.status === 'uninitialised') {
      this.props.dispatch(RealEstateActions.loadLiabilities())
    }
  }

  breadcrumbs(): BreadcrumbTrail {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Liabilities', path: '/portfolio/liabilities' },
    ]
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.liabilities.status === 'uninitialised') {
      this.props.dispatch(RealEstateActions.loadLiabilities())
    }
  }

  render() {
    const liabilities = _.map(this.props.liabilities.objects, (v, k) =>
      <li key={k} className='liability'>
        <Link className='liability-name' to={`/portfolio/liabilities/loans/${v.id}`}>{v.name}</Link>
      </li>
    )
    return (
      <div className='list-liabilities'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <p><Link to='/portfolio/liabilities/new'>New Liability</Link></p>
        <ol className='liabilities'>
          {liabilities}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    liabilities: state.liabilities,
  }
}

export default connect(mapStateToProps)(ListLiabilities)
