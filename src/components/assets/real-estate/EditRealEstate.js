// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import NotFound from '../../NotFound/NotFound.js'
import { putRealEstate, loadRealEstate } from '../../../actions/realEstate.js'
import type { RealEstate } from '../../../data/assets/realEstate.js'
import type { GlobalState } from '../../../store.js'
import type { ObjectStoreStatus } from 'store'
import type { BreadcrumbTrail } from '../../../components/Breadcrumbs/Breadcrumbs.js'

import './EditRealEstate.css'

type Props = {
  id: string,
  realEstate: {
    status: ObjectStoreStatus,
    object: RealEstate
  },
  dispatch: Dispatch
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

export default connect(mapStateToProps)(EditRealEstate)
