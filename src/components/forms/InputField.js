// @flow

import React from 'react'
import type { InputProps, MetaProps } from 'redux-form'

const InputField = (props: { input: InputProps, name: string, label: string, type: string, placeholder: string, meta: MetaProps }) => {
  const { input, name, label, type, placeholder, meta: { error } } = props
  const labelTag = label ? <label htmlFor={name}>{label}</label> : null

  const errorTags = []
  if (error) {
    error.forEach((msg, i) =>
      errorTags.push(<div key={i} className='error'>{msg}</div>)
    )
  }

  return (
    <div>
      {labelTag}
      <input id={name} type={type} placeholder={placeholder} {...input} />
      {error && <div className='errors'>{errorTags}</div>}
    </div>
  )
}

export default InputField
