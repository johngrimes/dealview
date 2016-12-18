// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import { reduxForm, Field } from 'redux-form'
import type { ValidateFunction, OnSubmitFunction } from 'redux-form'

import InputField from '../../forms/InputField.js'
import AddressField from '../../forms/AddressField.js'
import TextAreaField from '../../forms/TextAreaField.js'
import * as Validations from '../../../utils/FormValidation.js'
import * as RealEstateActions from '../../../actions/RealEstateActions.js'

import '../../../styles/forms.css'
import '../../../styles/buttons.css'
import './RealEstateForm.css'

const RealEstateForm = (props: { activePage: string, handleSubmit: Function, setActiveRealEstatePage: Function }) => {
  const { activePage, handleSubmit, setActiveRealEstatePage } = props
  const addressFields = {
    address1: 'address1',
    address2: 'address2',
    address3: 'address3',
    postcode: 'postcode',
    locality: 'locality',
    state: 'state'
  }

  return (
    <form className='real-estate-form form form-aligned' onSubmit={handleSubmit}>
      <fieldset className={formPageClass('general', activePage)}>
        <legend>General details</legend>

        <Field name='id' type='hidden' component={InputField} />
        <Field name='name' type='text' label='Name' component={InputField} />
        <Field name='address' meta={{ subfields: addressFields }} component={AddressField} />
        <Field name='notes' label='Notes' component={TextAreaField} />

        <button type='button' onClick={() => setActiveRealEstatePage('value')} className='button button-primary'>Next</button>
      </fieldset>
      <fieldset className={formPageClass('value', activePage)}>
        <legend>Value</legend>

        <button type='button' onClick={() => setActiveRealEstatePage('general')} className='button'>Previous</button>
        <button type='button' onClick={() => setActiveRealEstatePage('mortgage')} className='button button-primary'>Next</button>
      </fieldset>
      <fieldset className={formPageClass('mortgage', activePage)}>
        <legend>Mortgage</legend>

        <button type='button' onClick={() => setActiveRealEstatePage('value')} className='button'>Previous</button>
        <button type='submit' className='button button-primary'>Submit</button>
      </fieldset>
    </form>
  )
}

const formPageClass = (pageName: string, activePage: string): string =>
  pageName + (activePage === pageName ? '' : ' form-page-inactive')

const validate: ValidateFunction = values => {
  let errors = {}

  errors = Validations.required(values, errors, ['name'])
  errors = Validations.minLength(values, errors,
             [ 'name', 'address1', 'address2', 'address3', 'locality' ], 3)
  errors = Validations.maxLength(values, errors,
             [ 'name', 'address1', 'address2', 'address3', 'locality' ], 100)
  errors = Validations.isLength(values, errors, ['postcode'], 4)

  console.log('errors', errors)
  return errors
}

const onSubmit: OnSubmitFunction = (values, dispatch) =>
  dispatch(RealEstateActions.saveRealEstate(values))

const mapStateToProps = (state: Object) => ({
  activePage: state.form.realEstate.activePage
})
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RealEstateActions, dispatch)
const ConnectedRealEstateForm =
  connect(mapStateToProps, mapDispatchToProps)(RealEstateForm)

export default reduxForm({
  form: 'realEstate',
  validate,
  onSubmit
})(ConnectedRealEstateForm)
