// @flow

import React from 'react'
import { connect } from 'react-redux'
import CreateRealEstate from '../assets/real-estate/CreateRealEstate.js'
import './AppComponent.css'

type Location = {
  href: string,
  protocol: string,
  host: string,
  hostname: string,
  port: string,
  pathname: string,
  search: string,
  hash: string,
  username: string,
  password: string,
  origin: string
}
type Routes = Map<string, React$Element<any>>

const AppComponent = (props: { route: Location }) => {
  const routes: Routes = new Map()
  routes.set('/portfolio/assets/real-estate/new', <CreateRealEstate />)

  const mainComponent = routes.get(props.route.pathname)

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
      <div className='main'>{mainComponent}</div>
    </div>
  )
}

const mapStateToProps = (state: Object) => {
  return {
    route: state.app.route
  }
}

export default connect(mapStateToProps)(AppComponent)
