// @flow

//
// Validates a set of fields, using a supplied validator function.
//
export type Values = { [key: string]: string }
export type Errors = { [key: string]: string }
type Fields = Array<string>
type ValidatorFunction = (value: string) => boolean

const validate = (values: Values, errors: Errors, fields: Fields,
                  validator: ValidatorFunction, message: string) => {
  const updatedErrors = Object.assign({}, errors)
  fields.forEach(f => {
    console.log('f', f)
    console.log('values[f]', values[f])
    console.log('typeof values[f]', typeof values[f])
    console.log('validator', validator)
    if (typeof values[f] === 'undefined') return
    if (!validator(values[f])) {
      if (typeof updatedErrors[f] === 'undefined') updatedErrors[f] = []
      updatedErrors[f].push(message)
    }
  })
  return updatedErrors
}

//
// Validates the presence of a set of fields.
//
export const required = (values: Values, errors: Errors, fields: Fields) =>
  validate(values, errors, fields, v => v.length > 0, "can't be blank")

//
// Validates that a set of fields have values with a minimum length.
//
export const minLength = (values: Values, errors: Errors, fields: Fields,
                   min: number) =>
  validate(values, errors, fields, v => v.length >= min,
                  `must be at least ${min} characters`)

//
// Validates that a set of fields have values with a maximum length.
//
export const maxLength = (values: Values, errors: Errors, fields: Fields,
                   max: number) =>
  validate(values, errors, fields, v => v.length <= max,
                  `must be at most ${max} characters`)

//
// Validates that a set of fields have values with an exact length.
//
export const isLength = (values: Values, errors: Errors, fields: Fields,
                   is: number) =>
  validate(values, errors, fields, v => v.length === is,
                  `must be exactly ${is} characters`)
