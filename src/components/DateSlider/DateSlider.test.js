/* global expect */

import React from 'react'
import { shallow } from 'enzyme'

import DateSlider from 'components/DateSlider/DateSlider'

describe('DateSlider', () => {
  it('should render correctly', () => {
    const props = {
      dates: [ '2017-06-21', '2017-06-22', '2017-06-23' ],
      selected: '2017-06-22',
      initialised: true,
      className: 'someClass',
    }
    const wrapper = shallow(<DateSlider {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
