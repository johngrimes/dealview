// @flow

import React from 'react'

import RealEstateForm from './RealEstateForm.js'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs.js'

class CreateRealEstate extends React.Component {
  render() {
    return (
      <div className='create-real-estate'>
        <Breadcrumbs />
        <RealEstateForm />
      </div>
    )
  }
}

export default CreateRealEstate
