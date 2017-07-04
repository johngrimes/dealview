// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import RealEstateForm from 'components/assets/real-estate/RealEstateForm'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import RealEstateActions from 'actions/assets/realEstate'
import type { RealEstate } from 'types/assets/realEstate'
import type { BreadcrumbTrail } from 'components/Breadcrumbs/Breadcrumbs'

import './CreateRealEstate.css'

type Props = {
  dispatch: any,
  history: any,
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
    this.props.dispatch(RealEstateActions.putRealEstate(realEstate))
    this.props.history.push('/portfolio/assets')
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

export default connect()(withRouter(CreateRealEstate))
