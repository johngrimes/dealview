// @flow

import React from 'react'
import type { Children } from 'react'

const Scenarios = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className='scenarios'>
      <h1>Scenarios</h1>
      {children}
    </div>
  )
}

export default Scenarios
