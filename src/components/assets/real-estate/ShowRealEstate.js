// @flow

import React from 'react'

import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import { load, RealEstateEmpty } from '../../../data/assets/realEstate.js'
import type { Route } from '../../../routing.js'
import type { RealEstateValues } from '../../../data/assets/realEstate.js'

import './ShowRealEstate.css'

type Props = {
  id: string,
  route: Route
}

type State = {
  values: RealEstateValues
}

class ShowRealEstate extends React.Component {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = { values: RealEstateEmpty }
    load(props.id).then((values) => {
      this.setState({ values: values })
    }).catch((error) => console.error(error))
  }

  render() {
    const values = this.state.values

    return (
      <div className='show-real-estate'>
        <Breadcrumbs route={this.props.route} />
        <dl>
          <dd>Name</dd>
          <dt>{values.name}</dt>
          <dd>Address</dd>
          <dt>
            <div className='p-street-address'>{values.address.address1}</div>
            <div className='p-extended-address'>{values.address.address2}</div>
            <div className='p-extended-address'>{values.address.address3}</div>
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
