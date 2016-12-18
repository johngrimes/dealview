// @flow

import React from 'react'
import type { InputProps, MetaProps } from 'redux-form'

const TextAreaField = (props: { input: InputProps, name: string, label: string, placeholder: string, meta: MetaProps }) => {
  const { input, name, label, placeholder, meta: { touched, error } } = props
  const labelTag = label ? <label htmlFor={name}>{label}</label> : null

  const errorTags = []
  if (error) {
    error.forEach((msg, i) =>
      errorTags.push(<div key={i} className='error'>{msg}</div>)
    )
  }

  return <div className='control-group'>
           {labelTag}
           <textarea id={name} placeholder={placeholder} {...input} />
           {touched && error && <div className='errors'>{errorTags}</div>}
         </div>
}

export default TextAreaField
