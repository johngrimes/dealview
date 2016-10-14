// @flow

import React from 'react'
import type { Children } from 'react'

const ListAssets = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className="list-assets">
      <h1>List Assets</h1>
      {children}
    </div>
  )
}

export default ListAssets
