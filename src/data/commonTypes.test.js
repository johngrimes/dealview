import {
  formatNumber,
  formatDollars,
  unformatNumber,
  unformatDollars,
} from './commonTypes.js'

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

  it('should format 1 dollar correctly', () => {
    expect(formatDollars(34001)).toBe('$34,001')
  })
})

describe('unformatNumber', () => {
  it('should unformat a number correctly', () => {
    expect(unformatNumber('1,300,000')).toBe(1300000)
  })
})

describe('unformatDollars', () => {
  it('should unformat some dollars correctly', () => {
    expect(unformatDollars('$37,942,123')).toBe(37942123)
  })
})
