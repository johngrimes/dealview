// @flow

import React from 'react'
import type { Children } from 'react'

import './AppComponent.css'

const AppComponent = (props: { children: Children }) => {
  const { children } = props

  return (
    <div>{children}</div>
  )
}

export default AppComponent
