// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import RealEstateForm from 'components/assets/real-estate/RealEstateForm'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import NotFound from 'components/NotFound/NotFound'
import { putRealEstate, loadRealEstate } from 'actions/realEstate'
import type { RealEstate } from 'types/assets/realEstate'
import type { GlobalState } from 'store'
import type { ObjectStoreStatus } from 'store'
import type { BreadcrumbTrail } from 'components/Breadcrumbs/Breadcrumbs'

import './EditRealEstate.css'

type Props = {
  id: string,
  realEstate: {
    status: ObjectStoreStatus,
    object: RealEstate
  },
  dispatch: any,
  history: any,
}

export class EditRealEstate extends React.Component {
  props: Props
  handleSubmit: (realEstate: RealEstate) => void

  constructor(props: Props) {
    super(props)
    if (this.props.realEstate.status === 'uninitialised') {
      this.props.dispatch(loadRealEstate())
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs(): BreadcrumbTrail {
    const { id, realEstate: { object: realEstate } } = this.props
    const realEstateName = (typeof realEstate === 'undefined') ? id : realEstate.name
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
      { display: realEstateName, path: `/portfolio/assets/real-estate/${id}` },
    ]
  }

  handleSubmit(realEstate: RealEstate): void {
    this.props.dispatch(putRealEstate(realEstate))
    this.props.history.push('/portfolio/assets')
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.realEstate.status === 'uninitialised') {
      this.props.dispatch(loadRealEstate())
    }
  }

  render() {
    return (typeof this.props.realEstate.object === 'undefined')
    ? <NotFound />
    : <div className='edit-real-estate'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <RealEstateForm realEstate={this.props.realEstate.object} onSubmit={this.handleSubmit} />
      </div>
  }
}

const mapStateToProps = (state: GlobalState, ownProps: Props) => {
  return {
    realEstate: {
      status: state.realEstate.status,
      object: state.realEstate.objects[ownProps.id],
    },
  }
}

export default connect(mapStateToProps)(withRouter(EditRealEstate))
