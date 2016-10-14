// @flow

import React from 'react'
import type { Children } from 'react'

import RealEstateForm from './RealEstateForm.js'

const CreateRealEstate = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className="create-real-estate">
      <h1>Create Real Estate</h1>
      <RealEstateForm/>
      {children}
    </div>
  )
}

export default CreateRealEstate
