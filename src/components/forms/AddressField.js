// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

import AddressLineField from './AddressLineField.js'

import './AddressField.css'

type Subfields = { address1: string, address2: string, address3: string,
                   locality: string, state: string, postcode: string }

const AddressField = (props: { meta: { subfields: Subfields }, errors: Object, fields: Object }) => {
  // Names of the individual fields within the AddressField component are
  // passed in via the meta.subfields Object.
  const { meta: { subfields }, errors, fields } = props

  // Human-readable field labels.
  const labels = {
    address1: 'Line 1',
    address2: 'Line 2',
    address3: 'Line 3',
    locality: 'Suburb / Town',
    state: 'State',
    postcode: 'Postcode'
  }

  // Create an array from any address field errors.
  const errorTags = []
  if (errors) {
    Object.keys(subfields).forEach((field) => {
      const touched = fields && fields[field] && fields[field].touched
      if (touched && errors[field]) {
        errors[field].forEach((msg, i) => {
          const labelledMessage = labels[field] + ' ' + msg
          errorTags.push(<div key={field + i} className='error'>{labelledMessage}</div>)
        })
      }
    })
  }

  const addressClass = errorTags.length > 0
    ? 'address-field control-group with-errors'
    : 'address-field control-group'

  return (
    <div>
      <div className={addressClass}>
        <label htmlFor={subfields.address1}>Address</label>
        <div className='group'>
          <Field name={subfields.address1} type='text' label='Address' placeholder='Line 1' component={AddressLineField} />
          <Field name={subfields.address2} type='text' placeholder='Line 2' component={AddressLineField} />
          <Field name={subfields.address3} type='text' placeholder='Line 3' component={AddressLineField} />
          <Field name={subfields.locality} type='text' placeholder='Suburb / Town' component={AddressLineField} />
        </div>
        {errorTags.length > 0 && <div className='errors'>{errorTags}</div>}
      </div>
      <Field name={subfields.state} type='hidden' component={AddressLineField} />
      <Field name={subfields.postcode} type='hidden' component={AddressLineField} />
    </div>
  )
}

const mapStateToProps = (state: Object) => {
  return {
    errors: state.form.realEstate.syncErrors,
    fields: state.form.realEstate.fields
  }
}

export default connect(mapStateToProps)(AddressField)
