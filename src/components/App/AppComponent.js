// @flow

import React from 'react'

import EventPublisher from '../../data/events/EventPublisher.js'
import { routes, getRouteForPath } from '../../routing.js'
import type { Routes, Route } from '../../routing.js'

import '../../styles/base.css'
import '../../styles/menus.css'
import '../../styles/forms.css'
import './AppComponent.css'

type Props = {
  eventPublisher: EventPublisher
}
type State = {
  route?: Route
}

class AppComponent extends React.Component {
  props: Props
  state: State
  routes: Routes

  constructor(props: Props) {
    super(props)
    this.state = {
      route: getRouteForPath(routes, window.location.pathname)
    }
    window.addEventListener('popstate', (event) => {
      this.setState({
        route: getRouteForPath(routes, window.location.pathname)
      })
    })
  }

  render() {
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
        {this.state.route ? <div className='main'>{this.state.route.component}</div> : null}
      </div>
    )
  }
}

export default AppComponent
