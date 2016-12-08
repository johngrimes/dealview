// @flow

import React from 'react'
import type { Children } from 'react'

const CashFlow = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className='cash-flow'>
      <h1>Cash Flow</h1>
      {children}
    </div>
  )
}

export default CashFlow
