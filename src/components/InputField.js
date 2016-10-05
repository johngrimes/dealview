// @flow

import React from 'react'
import type { InputProps, MetaProps } from 'redux-form'

const InputField = (props: { input: InputProps, name: string, label: string,
                             type: string, placeholder: string,
                             meta: MetaProps }) => {
  const { input, name, label, type, placeholder,
          meta: { touched, error } } = props
  const labelTag = label ? <label htmlFor={name}>{label}</label> : null

  return (
    <div>
      {labelTag}
      <input id={name} type={type} placeholder={placeholder} {...input}/>
      {touched && error && <div className="error">{error}</div>}
    </div>
  )
}

export default InputField
