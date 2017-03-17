// @flow

import React from 'react'

import EventPublisher from '../../data/events/EventPublisher.js'
import { getRouteForPath, getNotFoundRoute } from '../../routing.js'
import { routes } from '../../routes.js'
import Link from '../Link.js'
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
  eventPublisher: Object

  constructor(props: Props) {
    super(props)
    this.eventPublisher = { eventPublisher: this.props.eventPublisher }
    this.state = {
      route: getRouteForPath(routes, window.location.pathname, this.eventPublisher)
    }
    this.props.eventPublisher.subscribe('Navigate', (eventType, content) => {
      this.setState({
        route: getRouteForPath(routes, window.location.pathname, this.eventPublisher) ||
          getNotFoundRoute(window.location.pathname)
      })
    })
    window.addEventListener('popstate', (event: Event) => {
      this.props.eventPublisher.publish('Navigate', { path: window.location.pathname })
    })
  }

  render() {
    return (
      <div>
        <header className='primary-menu menu menu-horizontal'>
          <Link className='logo menu-heading menu-link' href='/' {...this.eventPublisher}>DealView</Link>
          <ul className='primary-nav menu-list'>
            <li className='menu-item'>
              <Link className='menu-link' href='/portfolio' {...this.eventPublisher}>Portfolio</Link>
            </li>
            <li className='menu-item'>
              <Link className='menu-link' href='/cash-flow' {...this.eventPublisher}>Cash Flow</Link>
            </li>
            <li className='menu-item'>
              <Link className='menu-link' href='/scenarios' {...this.eventPublisher}>Scenarios</Link>
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
