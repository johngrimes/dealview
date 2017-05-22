// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import { putRealEstate } from '../../../actions/realEstate.js'
import type { RealEstate } from '../../../data/assets/realEstate.js'
import type { BreadcrumbTrail } from '../../Breadcrumbs/Breadcrumbs.js'

import './CreateRealEstate.css'

type Props = {
  dispatch: Dispatch
}

export class CreateRealEstate extends React.Component {
  props: Props
  breadcrumbs: () => BreadcrumbTrail
  handleSubmit: (realEstate: RealEstate) => void

  constructor(props: Props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs(): BreadcrumbTrail {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
      { display: 'New Real Estate Asset', path: '/portfolio/assets/real-estate/new' },
    ]
  }

  handleSubmit(realEstate: RealEstate): void {
    this.props.dispatch(putRealEstate(realEstate))
  }

  render() {
    return (
      <div className='create-real-estate'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <RealEstateForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default connect()(CreateRealEstate)
