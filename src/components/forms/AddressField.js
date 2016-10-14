// @flow

import React, { Component } from 'react'
import { Field } from 'redux-form'

import InputField from './InputField.js'
import SelectField from './SelectField.js'

type Subfields = { address1: string, address2: string, address3: string,
                   locality: string, state: string, postcode: string }

const AddressField = (props: { meta: { subfields: Subfields } }) => {
  // Names of the individual fields within the AddressField component are
  // passed in via the meta.subfields Object.
  const { meta: { subfields } } = props

  return (
    <div>
      <div className="group">
        <Field name={subfields.address1} type="text" label="Address"
               placeholder="Line 1" component={InputField}/>
        <Field name={subfields.address2} type="text"
               placeholder="Line 2" component={InputField}/>
        <Field name={subfields.address3} type="text"
               placeholder="Line 3" component={InputField}/>
      </div>
      <div>
        <Field name={subfields.locality} type="text"
               placeholder="Suburb / Town" component={InputField}/>
        <Field name={subfields.state} component={SelectField}/>
        <Field name={subfields.postcode} type="text"
               placeholder="Postcode" component={InputField}/>
      </div>
    </div>
  )
}

export default AddressField
