import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import AssetForm from './AssetForm.js'
import Breadcrumbs from './Breadcrumbs.js'
import AssetActions from '../actions/assets.js'

import './styles/CreateAsset.css'

export class CreateAsset extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs() {
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
      {
        display: 'New Asset',
        path: '/portfolio/assets/new',
      },
    ]
  }

  handleSubmit(realEstate) {
    this.props.dispatch(AssetActions.putAsset(realEstate))
    this.props.history.push('/portfolio/assets')
  }

  render() {
    return (
      <div className='create-asset'>
        <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
        <AssetForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default connect()(withRouter(CreateAsset))
