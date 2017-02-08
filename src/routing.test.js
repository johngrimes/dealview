/* global expect */

import { getRouteForPath } from './routing.js'

import React from 'react'

class SomeComponent extends React.Component {}
class SomeOtherComponent extends React.Component {}

const routes = [
  { route: '/documentation',
    componentClass: SomeComponent,
    breadcrumbs: [
      { display: 'Documentation', path: '/documentation' }
    ]
  },
  { route: '/categories/:category_id/items/:id',
    componentClass: SomeComponent
  },
  { route: '/help',
    componentClass: SomeComponent
  },
  { route: '/help',
    componentClass: SomeOtherComponent
  }
]

describe('getRouteForPath', () => {
  it('matches a route without parameters', () => {
    const route = getRouteForPath(routes, '/documentation')
    expect(route.route).toEqual('/documentation')
    expect(route.componentClass).toBe(SomeComponent)
  })

  it('matches a route with some parameters', () => {
    const route = getRouteForPath(routes, '/categories/kitchenware/items/99')
    expect(route.route).toEqual('/categories/:category_id/items/:id')
    expect(route.componentClass).toBe(SomeComponent)
    expect(route.component.props.category_id).toEqual('kitchenware')
    expect(route.component.props.id).toEqual('99')
  })

  it('matches the first matching route', () => {
    const route = getRouteForPath(routes, '/help')
    expect(route.componentClass).toBe(SomeComponent)
  })

  it('passes the route through as a prop to the component', () => {
    const route = getRouteForPath(routes, '/documentation')
    expect(route.component.props.route.breadcrumbs).toBeTruthy()
  })
})
