import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
  Redirect,
} from 'react-router-dom'

import Portfolio from './Portfolio.js'
import ListAssets from './ListAssets.js'
import CreateAsset from './CreateAsset.js'
import EditAsset from './EditAsset.js'
import ListLiabilities from './ListLiabilities.js'
import CreateLoan from './CreateLoan.js'
import EditLoan from './EditLoan.js'
import CashFlow from './CashFlow.js'
import Scenarios from './Scenarios.js'
import NotFound from './NotFound.js'

import '../styles/menus.css'
import './styles/App.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className='primary-menu menu menu-horizontal'>
            <Link className='logo menu-heading menu-link' to='/'>
              DealView
            </Link>
            <ul className='primary-nav menu-list'>
              <li className='menu-item'>
                <NavLink
                  className='menu-link'
                  activeClassName='menu-selected'
                  to='/portfolio'
                >
                  Portfolio
                </NavLink>
              </li>
              <li className='menu-item'>
                <NavLink
                  className='menu-link'
                  activeClassName='menu-selected'
                  to='/cash-flow'
                >
                  Cash Flow
                </NavLink>
              </li>
              <li className='menu-item'>
                <NavLink
                  className='menu-link'
                  activeClassName='menu-selected'
                  to='/scenarios'
                >
                  Scenarios
                </NavLink>
              </li>
            </ul>
            <div className='user-menu' />
          </header>
          <div className='main'>
            <Switch>
              <Route
                exact
                path='/'
                render={() => <Redirect to='/portfolio' />}
              />
              <Route exact path='/portfolio' component={Portfolio} />
              <Route exact path='/portfolio/assets' component={ListAssets} />
              <Route
                exact
                path='/portfolio/assets/new'
                component={CreateAsset}
              />
              <Route
                exact
                path='/portfolio/assets/:id'
                render={({ match, location }) =>
                  <EditAsset id={match.params.id} location={location} />}
              />
              <Route
                exact
                path='/portfolio/liabilities'
                component={ListLiabilities}
              />
              <Route
                exact
                path='/portfolio/liabilities/new'
                render={() =>
                  <Link to='/portfolio/liabilities/loans/new'>New Loan</Link>}
              />
              <Route
                exact
                path='/portfolio/liabilities/loans/new'
                component={CreateLoan}
              />
              <Route
                exact
                path='/portfolio/liabilities/loans/:id'
                render={({ match, location }) =>
                  <EditLoan id={match.params.id} location={location} />}
              />

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
