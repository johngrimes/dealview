/* global expect */

import { ListLiabilities } from 'components/liabilities/ListLiabilities'

import React from 'react'
import { shallow } from 'enzyme'

import { validLiabilityWithId1, validLiabilityWithId2 } from 'fixtures/liability'

describe('ListLiabilities', () => {
  it('should render some Liabilities', () => {
    const props = {
      liabilities: {
        status: 'loaded',
        objects: {
          [validLiabilityWithId1.id]: validLiabilityWithId1,
          [validLiabilityWithId2.id]: validLiabilityWithId2,
        },
      },
    }
    const wrapper = shallow(<ListLiabilities {...props} />)
    expect(wrapper.find('.liability').length).toBe(Object.keys(props.liabilities).length)
    expect(wrapper).toMatchSnapshot()
  })

  it('should load Liabilities if uninitialised', () => {
    const dispatch = jest.fn()
    const liabilityActions = require('actions/liabilities/liabilities').default
    liabilityActions.loadLiabilities = jest.fn()
    const props = {
      liabilities: {
        status: 'uninitialised',
        objects: {},
      },
      dispatch,
    }
    shallow(<ListLiabilities {...props} />)
    expect(dispatch).toHaveBeenCalled()
    expect(liabilityActions.loadLiabilities).toHaveBeenCalled()
  })
})
