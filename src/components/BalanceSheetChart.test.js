import React from 'react'
import { shallow } from 'enzyme'

import BalanceSheetChart from './BalanceSheetChart.js'
import { validBalanceSheet1 } from '../data/fixtures/balanceSheet.js'

describe('BalanceSheetChart', () => {
  it('should render', () => {
    const props = {
      balanceSheet: validBalanceSheet1,
    }
    const wrapper = shallow(<BalanceSheetChart {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
