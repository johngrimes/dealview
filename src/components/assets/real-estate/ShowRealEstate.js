// @flow

import React from 'react'

import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import { load, RealEstateEmpty } from '../../../data/assets/realEstate.js'
import type { Route } from '../../../routing.js'
import type { EventPublisher } from '../../../data/events/EventPublisher.js'
import type { RealEstateValues } from '../../../data/assets/realEstate.js'

import './ShowRealEstate.css'

type Props = {
  id: string,
  route: Route,
  eventPublisher?: EventPublisher
}

type State = {
  values: RealEstateValues
}

class ShowRealEstate extends React.Component {
  props: Props
  state: State
  eventPublisher: Object

  constructor(props: Props) {
    super(props)
    this.eventPublisher = { eventPublisher: this.props.eventPublisher }
    this.state = { values: RealEstateEmpty }
    load(props.id).then((values) => {
      this.setState({ values: values })
    }).catch((error) => console.error(error))
  }

  render() {
    const values = this.state.values

    return (
      <div className='show-real-estate'>
        <Breadcrumbs route={this.props.route} id={values.id} name={values.name} {...this.eventPublisher} />
        <dl>
          <dd>Name</dd>
          <dt>{values.name}</dt>
          <dd>Address</dd>
          <dt>
            <div className='p-street-address'>{values.address.line1}</div>
            <div className='p-extended-address'>{values.address.line2}</div>
            <div className='p-extended-address'>{values.address.line3}</div>
            <div className='p-locality'>{values.address.locality}</div>
            <div className='p-region'>{values.address.state}</div>
            <div className='p-postal-code'>{values.address.postcode}</div>
          </dt>
          <dd>Notes</dd>
          <dt>{values.notes}</dt>
        </dl>
      </div>
    )
  }
}

export default ShowRealEstate
