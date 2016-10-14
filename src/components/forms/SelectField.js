// @flow

import React from 'react'
import type { InputProps, MetaProps } from 'redux-form'

const SelectField = (props: { input: InputProps, name: string, label: string,
                              meta: MetaProps }) => {
  const { input, name, label, meta: { touched, error } } = props
  const labelTag = label ? <label htmlFor={name}>{label}</label> : null

  return (
    <div>
      {labelTag}
      <select id={name} {...input}>
        <option value="QLD">QLD</option>
      </select>
      {touched && error && <div className="error">{error}</div>}
    </div>
  )
}

export default SelectField
