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
  const updatedErrors = Object.assign({}, updatedErrors)
  fields.forEach(f => {
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
const required = (values: Values, errors: Errors, fields: Fields) =>
  validate(values, errors, fields, v => v.length > 0, "can't be blank")

//
// Validates that a set of fields have values with a minimum length.
//
const minLength = (values: Values, errors: Errors, fields: Fields,
                   min: number) =>
  validate(values, errors, fields, v => v.length >= min,
                  `must be at least ${min} characters`)

export default { required, minLength }
