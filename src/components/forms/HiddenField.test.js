/* global expect */

import HiddenField from 'components/forms/HiddenField'

import React from 'react'
import { shallow } from 'enzyme'

describe('HiddenField', () => {
  it('should render', () => {
    const props = {
      name: 'someInput',
      value: 'something',
    }
    const wrapper = shallow(<HiddenField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
