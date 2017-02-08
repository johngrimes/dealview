// @flow

import React from 'react'

import EventPublisher from '../../../data/events/EventPublisher.js'
import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'

import './CreateRealEstate.css'

type Props = {
  eventPublisher: EventPublisher
}

class CreateRealEstate extends React.Component {
  props: Props

  render() {
    return (
      <div className='create-real-estate'>
        <Breadcrumbs />
        <RealEstateForm eventPublisher={this.props.eventPublisher} />
      </div>
    )
  }
}

export default CreateRealEstate
