// @flow

import React from 'react'
import type { Children } from 'react'

const ShowAsset = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className="show-asset">
      <h1>Show Asset</h1>
      {children}
    </div>
  )
}

export default ShowAsset
