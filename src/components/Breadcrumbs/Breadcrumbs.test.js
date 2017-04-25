/* global expect */

import Breadcrumbs from './Breadcrumbs.js'

import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'

describe('Breadcrumbs', () => {
  it('should render a breadcrumb trail', () => {
    const props = {
      breadcrumbs: [
        { display: 'Link 1', path: '/link1' },
        { display: 'Link 2', path: '/link2' }
      ]
    }
    const wrapper = shallow(<Breadcrumbs {...props} />)
    expect(wrapper.find(Link)).toHaveLength(2)
    expect(wrapper.findWhere(node => {
      return node.type() === Link &&
        node.children().text() === 'Link 1' &&
        node.prop('to') === '/link1'
    })).toHaveLength(1)
    expect(wrapper.findWhere(node => {
      return node.type() === Link &&
        node.children().text() === 'Link 2' &&
        node.prop('to') === '/link2'
    })).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})
