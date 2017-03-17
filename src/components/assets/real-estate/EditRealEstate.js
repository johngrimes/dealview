// @flow

import React from 'react'

import EventPublisher from '../../../data/events/EventPublisher.js'
import { load } from '../../../data/assets/realEstate.js'
import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import type { RealEstateValues } from '../../../data/assets/realEstate.js'
import type { Route } from '../../../routing.js'

import './EditRealEstate.css'

type Props = {
  route: Route,
  eventPublisher: EventPublisher,
  id: string
}

type State = {
  values?: RealEstateValues
}

class EditRealEstate extends React.Component {
  props: Props
  state: State

  constructor(props: Props) {
    super()
    this.state = {}

    load(props.id).then(values => {
      this.setState({ values: values })
    })
  }

  render() {
    return (
      <div className='edit-real-estate'>
        <Breadcrumbs route={this.props.route} eventPublisher={this.props.eventPublisher}
          name={this.state.values ? this.state.values.name : this.props.id} />
        <RealEstateForm eventPublisher={this.props.eventPublisher} values={this.state.values} />
      </div>
    )
  }
}

export default EditRealEstate
