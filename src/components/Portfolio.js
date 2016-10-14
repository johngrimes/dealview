// @flow

import React from 'react'
import type { Children } from 'react'

const Portfolio = (props: { children: Children }) => {
  const { children } = props

  return (
    <div className="portfolio">
      <h1>Portfolio</h1>
      {children}
    </div>
  )
}

export default Portfolio
