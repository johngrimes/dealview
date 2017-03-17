// @flow

import React from 'react'

import EventPublisher from '../../../data/events/EventPublisher.js'
import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import { editRealEstatePath } from '../../../routes.js'
import type { Route } from '../../../routing.js'
import type { RealEstateValues } from '../../../data/assets/realEstate.js'

import './CreateRealEstate.css'

type Props = {
  route: Route,
  eventPublisher: EventPublisher
}

class CreateRealEstate extends React.Component {
  props: Props
  handleSubmit: (values: RealEstateValues) => void

  constructor(props: Props) {
    super()

    this.handleSubmit = (values) => {
      props.eventPublisher.publish('Navigate', { path: editRealEstatePath(values.id) })
    }
  }

  render() {
    return (
      <div className='create-real-estate'>
        <Breadcrumbs route={this.props.route} eventPublisher={this.props.eventPublisher} />
        <RealEstateForm eventPublisher={this.props.eventPublisher} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default CreateRealEstate
