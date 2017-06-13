// @flow

import _ from 'lodash'

type ValidatorFunction = (value: any) => boolean
export type FieldErrors = string[]
export type FormErrors = { +[fieldName: string]: (FieldErrors|FormErrors) }

//
// Validates a set of fields, using a supplied validator function.
//
export const validate = (value: any, validator: ValidatorFunction, message: string): FieldErrors => {
  if (!validator(value)) return [message]
  else return []
}

export const areErrorsPresent = (errors: FormErrors): boolean => {
  return _.some(errors, value => {
    if (value instanceof Array) {
      return value.length > 0
    } else if (value instanceof Object) {
      return areErrorsPresent(value)
    } else {
      console.error('Value encountered in form errors object that is not Array or Object')
    }
  })
}

//
// Validates the presence of a set of fields.
//
export const required = (value: string): FieldErrors =>
  validate(value, v => !!v, "can't be blank")

//
// Validates that a set of fields have values with a minimum length.
//
export const minLength = (value: string, min: number): FieldErrors =>
  validate(value, v => !v || v.length >= min, `must be at least ${min} characters`)

//
// Validates that a set of fields have values with a maximum length.
//
export const maxLength = (value: string, max: number): FieldErrors =>
  validate(value, v => !v || v.length <= max, `must be at most ${max} characters`)

//
// Validates that a set of fields have values with an exact length.
//
export const isLength = (value: string, is: number): FieldErrors =>
  validate(value, v => !v || v.length === is, `must be exactly ${is} characters`)
