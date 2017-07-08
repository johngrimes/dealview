/* global expect */

import * as Validation from 'utils/FormValidation'

describe('areErrorsPresent', () => {
  it('should return false for empty FormErrors object', () => {
    const errors = {
      name: [],
      address: {
        line1: [],
        line2: [],
        line3: [],
      },
      notes: [],
    }
    expect(Validation.areErrorsPresent(errors)).toBe(false)
  })

  it('should return true for FormErrors with nested value', () => {
    const errors = {
      name: [],
      address: {
        line1: ['does not sound right'],
        line2: [],
        line3: [],
      },
      notes: [],
    }
    expect(Validation.areErrorsPresent(errors)).toBe(true)
  })
})

describe('findFirstErrorFieldName', () => {
  it('should return the name of the first field with errors', () => {
    const errors = {
      name: [],
      address: {
        line1: [],
        line2: [],
        line3: [],
      },
      notes: ['has incorrect grammar in it'],
    }
    const result = Validation.findFirstErrorFieldName(errors)
    expect(result).toEqual('notes')
  })

  it('should return a field within a complex input', () => {
    const errors = {
      name: [],
      address: {
        line1: [],
        line2: ["is not anywhere I've ever heard of"],
        line3: [],
      },
      notes: [],
    }
    const result = Validation.findFirstErrorFieldName(errors)
    expect(result).toEqual('address-line2')
  })
})

describe('required', () => {
  it('should return an error for a blank string', () => {
    expect(Validation.required('')).toMatchSnapshot()
  })

  it('should return an error for undefined', () => {
    expect(Validation.required(undefined)).toMatchSnapshot()
  })

  it('should not return an error for a string', () => {
    expect(Validation.required('dog')).toMatchSnapshot()
  })

  it('should not return an error for a number', () => {
    expect(Validation.required(54)).toMatchSnapshot()
  })
})

describe('minLength', () => {
  it('should return an error for a string that is less', () => {
    expect(Validation.minLength('dog', 4)).toMatchSnapshot()
  })

  it('should not return an error for a string that is equal', () => {
    expect(Validation.minLength('dog', 3)).toMatchSnapshot()
  })

  it('should not return an error for a string that is more', () => {
    expect(Validation.minLength('dog', 2)).toMatchSnapshot()
  })
})

describe('maxLength', () => {
  it('should return an error for a string that is more', () => {
    expect(Validation.maxLength('horse', 4)).toMatchSnapshot()
  })

  it('should not return an error for a string that is equal', () => {
    expect(Validation.maxLength('horse', 5)).toMatchSnapshot()
  })

  it('should not return an error for a string that is less', () => {
    expect(Validation.maxLength('horse', 6)).toMatchSnapshot()
  })
})

describe('isLength', () => {
  it('should return an error for a string that is more', () => {
    expect(Validation.isLength('horse', 4)).toMatchSnapshot()
  })

  it('should not return an error for a string that is equal', () => {
    expect(Validation.isLength('horse', 5)).toMatchSnapshot()
  })

  it('should return an error for a string that is less', () => {
    expect(Validation.isLength('horse', 6)).toMatchSnapshot()
  })
})
