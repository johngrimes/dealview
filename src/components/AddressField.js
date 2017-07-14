import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import * as Validations from '../utils/formValidation.js'

import './styles/AddressField.css'

export const AddressErrorsDefaults = {
  line1: [],
  line2: [],
  line3: [],
}

// Human-readable field labels.
const AddressLabels = {
  line1: 'Line 1',
  line2: 'Line 2',
  line3: 'Line 3',
  locality: 'Suburb / Town',
  state: 'State',
  postcode: 'Postcode',
}

class AddressField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: props.address,
      touched: [],
    }
    this._refs = {}

    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(fieldName, value) {
    const updatedAddress = { ...this.state.address, [fieldName]: value }
    this.setState(
      prevState => {
        const updatedTouched = prevState.touched.includes(fieldName)
          ? prevState.touched
          : prevState.touched.concat(fieldName)
        return { address: updatedAddress, touched: updatedTouched }
      },
      () => {
        if (this.props.onChange) this.props.onChange(updatedAddress)
      }
    )
  }

  handleFocus(event) {
    const target = event.target
    if (this.props.onFocus) {
      this.props.onFocus(target.name)
    }
  }

  setFocus() {
    if (this.props.focus && this._refs[this.props.focus]) {
      this._refs[this.props.focus].focus()
    }
  }

  componentWillReceiveProps(props) {
    this.setState(() => ({ address: props.address }))
  }

  componentDidMount() {
    this.setFocus()
  }

  componentDidUpdate() {
    this.setFocus()
  }

  render() {
    const { name, forceErrorDisplay } = this.props
    const errors = this.props.errors === undefined ? {} : this.props.errors
    const { touched } = this.state
    const address = this.state.address ? this.state.address : {}

    // Create an array from any address field errors.
    const errorTags = _.flatMap(errors, (fieldErrors, fieldName) => {
      return forceErrorDisplay || touched.includes(fieldName)
        ? fieldErrors.map((msg, i) => {
          const labelledMessage = AddressLabels[fieldName] + ' ' + msg
          return (
              <div key={fieldName + '-' + i} className='error'>
                {labelledMessage}
              </div>
          )
        })
        : []
    })

    const addressClass =
      touched && errorTags.length > 0
        ? 'address-field control-group with-errors'
        : 'address-field control-group'

    return (
      <div>
        <div className={addressClass}>
          <label htmlFor={name + '-line1'}>Address</label>
          <div className='group'>
            <input
              id={name + '-line1'}
              name={name + '-line1'}
              type='text'
              placeholder={AddressLabels.line1}
              value={address.line1}
              ref={input => (this._refs[name + '-line1'] = input)}
              onChange={event => this.handleChange('line1', event.target.value)}
              onFocus={this.handleFocus}
            />
            <input
              name={name + '-line2'}
              type='text'
              placeholder={AddressLabels.line2}
              value={address.line2}
              ref={input => (this._refs[name + '-line2'] = input)}
              onChange={event => this.handleChange('line2', event.target.value)}
              onFocus={this.handleFocus}
            />
            <input
              name={name + '-line3'}
              type='text'
              placeholder={AddressLabels.line3}
              value={address.line3}
              ref={input => (this._refs[name + '-line3'] = input)}
              onChange={event => this.handleChange('line3', event.target.value)}
              onFocus={this.handleFocus}
            />
            <input
              name={name + '-locality'}
              type='text'
              placeholder={AddressLabels.locality}
              value={address.locality}
              ref={input => (this._refs[name + '-locality'] = input)}
              onChange={event =>
                this.handleChange('locality', event.target.value)}
              onFocus={this.handleFocus}
            />
          </div>
          {errorTags.length > 0 &&
            <div className='errors'>
              {errorTags}
            </div>}
        </div>
        <input name={name + '-state'} type='hidden' value={address.state} />
        <input
          name={name + '-postcode'}
          type='hidden'
          value={address.postcode}
        />
      </div>
    )
  }

  static validate(address) {
    const errors = {}

    errors.line1 = []
      .concat(Validations.minLength(address.line1, 3))
      .concat(Validations.maxLength(address.line1, 100))

    errors.line2 = []
      .concat(Validations.minLength(address.line2, 3))
      .concat(Validations.maxLength(address.line2, 100))

    errors.line3 = []
      .concat(Validations.minLength(address.line3, 3))
      .concat(Validations.maxLength(address.line3, 100))

    return errors
  }
}

AddressField.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.shape({
    line1: PropTypes.string,
    line2: PropTypes.string,
    line3: PropTypes.string,
    locality: PropTypes.string,
    state: PropTypes.string,
    postcode: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    line1: PropTypes.arrayOf(PropTypes.string),
    line2: PropTypes.arrayOf(PropTypes.string),
    line3: PropTypes.arrayOf(PropTypes.string),
  }),
  forceErrorDisplay: PropTypes.bool,
  focus: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
}

export default AddressField
