import _ from 'lodash'

//
// Validates a set of fields, using a supplied validator function.
//
export const validate = (value, validator, message) => {
  if (!validator(value)) return [message]
  else return []
}

export const areErrorsPresent = errors => {
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

export const findFirstErrorFieldName = formErrors => {
  return (function seek(formErrors, parentComponentName) {
    let match = null
    _.some(formErrors, (errors, fieldName) => {
      if (errors instanceof Array) {
        if (errors.length > 0) {
          match = parentComponentName ? parentComponentName + '-' + fieldName : fieldName
          return true
        } else return false
      } else if (errors instanceof Object) {
        match = seek(errors, fieldName)
        return match !== null
      }
    })
    return match
  })(formErrors)
}

//
// Validates the presence of a set of fields.
//
export const required = value => validate(value, v => !!v, "can't be blank")

//
// Validates that a set of fields have values with a minimum length.
//
export const minLength = (value, min) =>
  validate(value, v => !v || v.length >= min, `must be at least ${min} characters`)

//
// Validates that a set of fields have values with a maximum length.
//
export const maxLength = (value, max) =>
  validate(value, v => !v || v.length <= max, `must be at most ${max} characters`)

//
// Validates that a set of fields have values with an exact length.
//
export const isLength = (value, is) => validate(value, v => !v || v.length === is, `must be exactly ${is} characters`)
