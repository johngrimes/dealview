/* global expect */

import { areErrorsPresent } from './FormValidation.js'

describe('areErrorsPresent', () => {
  it('should return false for empty FormErrors object', () => {
    const errors = {
      name: [],
      address: {
        line1: [],
        line2: [],
        line3: []
      },
      notes: []
    }
    expect(areErrorsPresent(errors)).toBe(false)
  })

  it('should return true for FormErrors with nested value', () => {
    const errors = {
      name: [],
      address: {
        line1: ['does not sound right'],
        line2: [],
        line3: []
      },
      notes: []
    }
    expect(areErrorsPresent(errors)).toBe(true)
  })
})
