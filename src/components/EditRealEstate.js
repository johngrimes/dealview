import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from './Breadcrumbs.js'
import NotFound from './NotFound.js'
import RealEstateActions from '../actions/realEstate.js'

import './styles/EditRealEstate.css'

export class EditRealEstate extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.realEstate.status === 'uninitialised') {
      this.props.dispatch(RealEstateActions.loadRealEstate())
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs() {
    const { id, realEstate: { object: realEstate } } = this.props
    const realEstateName = typeof realEstate === 'undefined' ? id : realEstate.name
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
      { display: realEstateName, path: `/portfolio/assets/real-estate/${id}` },
    ]
  }

  handleSubmit(realEstate) {
    this.props.dispatch(RealEstateActions.putRealEstate(realEstate))
    this.props.history.push('/portfolio/assets')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.realEstate.status === 'uninitialised') {
      this.props.dispatch(RealEstateActions.loadRealEstate())
    }
  }

  render() {
    return typeof this.props.realEstate.object === 'undefined'
      ? <NotFound />
      : <div className='edit-real-estate'>
          <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
          <RealEstateForm realEstate={this.props.realEstate.object} onSubmit={this.handleSubmit} />
        </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    realEstate: {
      status: state.realEstate.status,
      object: state.realEstate.objects[ownProps.id],
    },
  }
}

export default connect(mapStateToProps)(withRouter(EditRealEstate))
