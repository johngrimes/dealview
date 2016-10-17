// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import type { Store } from 'redux'
import Dexie from 'dexie'

import configureStore from './store/configureStore.js'
import AppComponent from './components/App/AppComponent.js'
import Portfolio from './components/Portfolio.js'
import CashFlow from './components/CashFlow.js'
import Scenarios from './components/Scenarios.js'
import ListAssets from './components/assets/ListAssets.js'
import CreateAsset from './components/assets/CreateAsset.js'
import ShowAsset from './components/assets/ShowAsset.js'
import CreateRealEstate from
         './components/assets/real-estate/CreateRealEstate.js'
import ShowRealEstate from './components/assets/real-estate/ShowRealEstate.js'
import EditRealEstate from './components/assets/real-estate/EditRealEstate.js'
import ListLiabilities from './components/liabilities/ListLiabilities.js'

window.db = new Dexie('DealView')
window.db.version(1).stores({
  realEstate: `++id, name, address1, address2, address3, locality, state,
    postcode, notes`
})
window.db.open().catch(error => console.log(error))

const store: Store = configureStore({
  form: { realEstate: { activePage: 'general' } }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppComponent}>
        <Redirect from="/" to="portfolio"/>
        <Route name="portfolio" path="portfolio" component={Portfolio}>
          <Route name="listAssets" path="assets" component={ListAssets}>
            <Route name="createAsset" path="new" component={CreateAsset}/>
            <Route name="showAsset" path=":id" component={ShowAsset}/>
            <Route path="real-estate">
              <Route name="createRealEstate" path="new"
                     component={CreateRealEstate}/>
              <Route name="showRealEstate" path=":id"
                     component={ShowRealEstate}/>
              <Route name="editRealEstate" path=":id/edit"
                     component={EditRealEstate}/>
            </Route>
          </Route>
          <Route name="listLiabilities" path="liabilities"
                 component={ListLiabilities}/>
        </Route>
        <Route name="cashFlow" path="cash-flow" component={CashFlow}/>
        <Route name="scenarios" path="scenarios" component={Scenarios}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
