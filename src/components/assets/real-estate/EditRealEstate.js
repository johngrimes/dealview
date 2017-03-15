// @flow

import React from 'react'

import EventPublisher from '../../../data/events/EventPublisher.js'
import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import type { Route } from '../../../routing.js'

import './EditRealEstate.css'

type Props = {
  route: Route,
  eventPublisher: EventPublisher,
  id: string
}

class EditRealEstate extends React.Component {
  props: Props

  render() {
    return (
      <div className='edit-real-estate'>
        <Breadcrumbs route={this.props.route} eventPublisher={this.props.eventPublisher} />
        <RealEstateForm eventPublisher={this.props.eventPublisher} id={this.props.id} />
      </div>
    )
  }
}

export default EditRealEstate
