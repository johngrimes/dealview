// @flow

import React from 'react'
import type { Children } from 'react'

import './AppComponent.css'

const AppComponent = (props: { children: Children }) => {
  const { children } = props

  return (
    <div>
      <header className='primary-menu menu menu-horizontal'>
        <a className='logo menu-heading menu-link' href='/'>DealView</a>
        <ul className='primary-nav menu-list'>
          <li className='menu-item'>
            <a className='menu-link' href='/portfolio'>Portfolio</a>
          </li>
          <li className='menu-item'>
            <a className='menu-link' href='/cash-flow'>Cash Flow</a>
          </li>
          <li className='menu-item'>
            <a className='menu-link' href='/scenarios'>Scenarios</a>
          </li>
        </ul>
        <div className='user-menu' />
      </header>
      <div className='main'>{children}</div>
    </div>
  )
}

export default AppComponent
