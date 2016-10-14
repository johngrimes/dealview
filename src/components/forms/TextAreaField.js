// @flow

import React from 'react'
import type { InputProps, MetaProps } from 'redux-form'

const TextAreaField = (props: { input: InputProps, name: string, label: string,
                                placeholder: string, meta: MetaProps }) => {
  const { input, name, label, placeholder,
          meta: { touched, error } } = props
  const labelTag = label ? <label htmlFor={name}>{label}</label> : null

  return (
    <div>
      {labelTag}
      <textarea id={name} placeholder={placeholder} {...input}/>
      {touched && error && <div className="error">{error}</div>}
    </div>
  )
}

export default TextAreaField
