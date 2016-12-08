// @flow

import React from 'react'
import type { Children } from 'react'

import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'
import type { Breadcrumb, Route } from '../../Breadcrumbs/Breadcrumbs.js'

type Props = {
  breadcrumbs: Array<Breadcrumb>,
  routes: Array<Route>,
  children: Children
}

class CreateRealEstate extends React.Component {
  props: Props

  static breadcrumb(): Breadcrumb {
    return {
      display: 'New Real Estate Asset',
      path: 'real-estate/new'
    }
  }

  render() {
    return (
      <div className='create-real-estate'>
        <Breadcrumbs routes={this.props.routes} />
        <RealEstateForm />
      </div>
    )
  }
}

export default CreateRealEstate
