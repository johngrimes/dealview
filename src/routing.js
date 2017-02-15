import React from 'react'

import CreateRealEstate from './components/assets/real-estate/CreateRealEstate.js'
import ShowRealEstate from './components/assets/real-estate/ShowRealEstate.js'
import type { Breadcrumb } from './components/Breadcrumbs/Breadcrumbs.js'

type Routes = Array<Route>
type Route = {
  route: string,
  componentClass: React$Element<any>,
  component: React$Element<any>,
  breadcrumbs: Array<Breadcrumb>
}

const placeholderPattern = /:(\w+)/g

export const routes: Routes = [
  { route: '/portfolio/assets/real-estate/new',
    componentClass: CreateRealEstate,
    breadcrumbs: [
      { display: 'Assets', path: '/portfolio/assets' },
      { display: 'New Real Estate Asset', path: '/portfolio/assets/real-estate/new' }
    ]
  },
  { route: '/portfolio/assets/real-estate/:id',
    componentClass: ShowRealEstate,
    breadcrumbs: [
      { display: 'Assets', path: '/portfolio/assets' },
      { display: ':name', path: '/portfolio/assets/:id' }
    ]
  }
]

export const getRouteForPath = (routes: Routes, path: string): Route => {
  let match = null
  routes.some(route => {
    const pathPattern: string = route.route.replace(placeholderPattern, '(\\w+)')
    const values = path.match(pathPattern)
    if (values) {
      const placeholders: Array<string>|void = []
      let x = placeholderPattern.exec(route.route)
      while (x) {
        placeholders.push(x[1])
        x = placeholderPattern.exec(route.route)
      }
      const props = placeholders ? placeholders.reduce((p, placeholder, i) => {
        p[placeholder] = values[i + 1]
        return p
      }, route.props ? route.props : {}) : []
      props.route = route
      route.component = React.createElement(route.componentClass, props)
      match = route
      return true
    } else return false
  })
  return match
}
