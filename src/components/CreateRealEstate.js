import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from './Breadcrumbs.js'
import RealEstateActions from '../actions/realEstate.js'

import './styles/CreateRealEstate.css'

export class CreateRealEstate extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs() {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
      {
        display: 'New Real Estate Asset',
        path: '/portfolio/assets/real-estate/new',
      },
    ]
  }

  handleSubmit(realEstate) {
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
