/* global expect */

import { formatNumber, formatDollars } from 'types/commonTypes'

describe('formatNumber', () => {
  it('should format a number correctly', () => {
    expect(formatNumber(3157852)).toBe('3,157,852')
    expect(formatNumber(852)).toBe('852')
    expect(formatNumber(1000)).toBe('1,000')
  })
})

describe('formatDollars', () => {
  it('should format some dollars correctly', () => {
    expect(formatDollars(34001)).toBe('$34,001')
  })
})
