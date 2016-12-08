// @flow

import React from 'react'
import type { Children } from 'react'

const EditRealEstate = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className='edit-real-estate'>
      <h1>Edit Real Estate</h1>
      {children}
    </div>
  )
}

export default EditRealEstate
