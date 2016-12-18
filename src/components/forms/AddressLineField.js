// @flow

import React from 'react'
import type { InputProps, MetaProps } from 'redux-form'

const AddressLineField = (props: { input: InputProps, name: string, type: string, placeholder: string, meta: MetaProps }) => {
  const { input, name, type, placeholder, meta: { touched, error } } = props

  const inputClass = touched && error ? 'with-errors' : ''

  return (
    <input id={name} className={inputClass} type={type} placeholder={placeholder} {...input} />
  )
}

export default AddressLineField
