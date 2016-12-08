// @flow

import React from 'react'
import type { Children } from 'react'

const CreateAsset = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className='create-asset'>
      <h1>Create Asset</h1>
      {children}
    </div>
  )
}

export default CreateAsset
