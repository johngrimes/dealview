// @flow

import React from 'react'
import type { Element } from 'react'

import NotFound from './components/NotFound.js'
import type { Breadcrumb } from './components/Breadcrumbs/Breadcrumbs.js'

export type Routes = Array<Route>
export type Route = {
  route: string,
  componentClass: any,
  component?: Element<any>,
  breadcrumbs?: Array<Breadcrumb>
}

const placeholderPattern = /:(\w+)/g

export const getRouteForPath = (routes: Routes, path: string, additionalProps: Object = {}): Route|void => {
  let match = null
  routes.some(route => {
    const pathPattern: string = route.route.replace(placeholderPattern, '(\\w+)')
    const values = path.match(pathPattern)
    if (values) {
      const placeholders: Array<string> = []
      let x = placeholderPattern.exec(route.route)
      while (x) {
        placeholders.push(x[1])
        x = placeholderPattern.exec(route.route)
      }
      const initialProps = Object.assign(additionalProps, route.props ? route.props : {})
      const props = placeholders ? placeholders.reduce((p, placeholder, i) => {
        p[placeholder] = values[i + 1]
        return p
      }, initialProps) : {}
      props.route = route
      route.component = React.createElement(route.componentClass, props)
      match = route
      return true
    } else return false
  })
  return match
}

export const getNotFoundRoute = (path: string): Route => {
  return {
    route: path,
    componentClass: NotFound,
    component: React.createElement(NotFound)
  }
}
