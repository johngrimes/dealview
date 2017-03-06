// @flow

import React from 'react'

import EventPublisher from '../../../data/events/EventPublisher.js'
import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import type { Route } from '../../../routing.js'

import './CreateRealEstate.css'

type Props = {
  route: Route,
  eventPublisher: EventPublisher
}

class CreateRealEstate extends React.Component {
  props: Props

  render() {
    return (
      <div className='create-real-estate'>
        <Breadcrumbs route={this.props.route} eventPublisher={this.props.eventPublisher} />
        <RealEstateForm eventPublisher={this.props.eventPublisher} />
      </div>
    )
  }
}

export default CreateRealEstate
