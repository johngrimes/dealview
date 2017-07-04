// @flow

import React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'

import Portfolio from 'components/Portfolio/Portfolio'
import ListAssets from 'components/assets/ListAssets'
import CreateRealEstate from 'components/assets/real-estate/CreateRealEstate'
import EditRealEstate from 'components/assets/real-estate/EditRealEstate'
import ListLiabilities from 'components/liabilities/ListLiabilities'
import CashFlow from 'components/CashFlow'
import Scenarios from 'components/Scenarios'
import NotFound from 'components/NotFound/NotFound'

import 'styles/base.css'
import 'styles/menus.css'
import 'styles/forms.css'
import 'components/App/App.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className='primary-menu menu menu-horizontal'>
            <Link className='logo menu-heading menu-link' to='/'>DealView</Link>
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
                render={({ match, location }) => <EditRealEstate id={match.params.id} location={location} />} />
              <Route exact path='/portfolio/liabilities/new' render={() => <Link to='/portfolio/liabilities/loans/new'>New Loan</Link>} />
              <Route exact path='/portfolio/liabilities' component={ListLiabilities} />

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

export default App
