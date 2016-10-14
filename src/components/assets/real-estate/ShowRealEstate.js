// @flow

import React from 'react'
import type { Children } from 'react'

const ShowRealEstate = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className="show-real-estate">
      <h1>Show Real Estate</h1>
      {children}
    </div>
  )
}

export default ShowRealEstate
