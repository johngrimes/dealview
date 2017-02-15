/* global expect */

import Breadcrumbs from './Breadcrumbs.js'

import React from 'react'
import renderer from 'react-test-renderer'

const route = {
  route: '/categories/:category_id/items/:id',
  breadcrumbs: [
    { display: 'Categories', path: '/categories' },
    { display: '{categoryName}', path: '/categories/{categoryId}' },
    { display: '{itemName}', path: '/categories/{categoryId}/items/{itemId}' }
  ]
}

describe('Breadcrumbs', () => {
  it('should render using variable substitution', () => {
    const component = renderer.create(
      <Breadcrumbs route={route} categoryId='kitchenware' categoryName='Kitchenware' itemId='99' itemName='Long-Handled Spatula' />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
