// @flow

import React from 'react'
import type { Children } from 'react'

const ListLiabilities = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className='list-liabilities'>
      <h1>List Liabilities</h1>
      {children}
    </div>
  )
}

export default ListLiabilities
