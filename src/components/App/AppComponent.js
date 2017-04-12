// @flow

import React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'

import Portfolio from '../Portfolio.js'
import ListAssets from '../assets/ListAssets.js'
import CreateRealEstate from '../assets/real-estate/CreateRealEstate.js'
import EditRealEstate from '../assets/real-estate/EditRealEstate.js'
import CashFlow from '../CashFlow.js'
import Scenarios from '../Scenarios.js'
import NotFound from '../NotFound/NotFound.js'

import '../../styles/base.css'
import '../../styles/menus.css'
import '../../styles/forms.css'
import './AppComponent.css'

class AppComponent extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className='primary-menu menu menu-horizontal'>
            <a className='logo menu-heading menu-link' href='/'>DealView</a>
            <ul className='primary-nav menu-list'>
              <li className='menu-item'>
                <NavLink className='menu-link' activeClassName='menu-selected' to='/portfolio'>Portfolio</NavLink>
              </li>
              <li className='menu-item'>
                <NavLink className='menu-link' activeClassName='menu-selected' to='/cash-flow'>Cash Flow</NavLink>
              </li>
              <li className='menu-item'>
                <NavLink className='menu-link' activeClassName='menu-selected' to='/scenarios'>Scenarios</NavLink>
              </li>
            </ul>
            <div className='user-menu' />
          </header>
          <div className='main'>
            <Switch>
              <Route exact path='/portfolio' component={Portfolio} />
              <Route exact path='/portfolio/assets' component={ListAssets} />
              <Route exact path='/portfolio/assets/new' render={() => <Link to='/portfolio/assets/real-estate/new'>New Real Estate</Link>} />
              <Route exact path='/portfolio/assets/real-estate/new' component={CreateRealEstate} />
              <Route exact path='/portfolio/assets/real-estate/:id'
                render={({ match }) => <EditRealEstate id={match.params.id} />} />

              <Route exact path='/cash-flow' component={CashFlow} />

              <Route exact path='/scenarios' component={Scenarios} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default AppComponent
