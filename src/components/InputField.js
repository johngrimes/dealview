import React from 'react'
import PropTypes from 'prop-types'

class InputField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf([
      'hidden',
      'text',
      'search',
      'tel',
      'url',
      'email',
      'password',
      'date',
      'month',
      'week',
      'time',
      'datetime-local',
      'number',
      'range',
      'color',
      'checkbox',
      'radio',
      'file',
      'submit',
      'image',
      'reset',
      'button',
    ]),
    placeholder: PropTypes.string,
    min: PropTypes.number,
    value: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      checked: props.checked,
      touched: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(event) {
    const target = event.target
    this.setState(
      () => ({ value: target.value, checked: target.checked, touched: true }),
      () => {
        if (this.props.onChange) {
          this.props.onChange(target.value, target.checked)
        }
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
    if (this.props.focus === this.props.name) {
      this.ref.focus()
    }
  }

  componentWillReceiveProps(props) {
    this.setState(() => ({ value: props.value, checked: props.checked }))
  }

  componentDidMount() {
    this.setFocus()
  }

  componentDidUpdate() {
    this.setFocus()
  }

  render() {
    const {
      name,
      type,
      label,
      placeholder,
      min,
      errors,
      className,
      forceErrorDisplay,
    } = this.props
    const { checked, touched } = this.state
    const value = this.state.value ? this.state.value : ''
    const labelTag = label
      ? <label htmlFor={name}>
          {label}
        </label>
      : null
    const errorTags = []
    if (errors) {
      errors.forEach((msg, i) =>
        errorTags.push(
          <div key={i} className='error'>
            {msg}
          </div>
        )
      )
    }
    const classNameWithErrors =
      touched && errorTags.length > 0 ? className + ' with-errors' : className
    const props = {
      name,
      className: classNameWithErrors,
      type,
      placeholder,
      min,
      value,
      checked,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      ref: input => (this.ref = input),
    }

    return (
      <div className='control-group'>
        {labelTag}
        <input {...props} />
        {(forceErrorDisplay || touched) &&
          errorTags.length > 0 &&
          <div className='errors'>
            {errorTags}
          </div>}
      </div>
    )
  }
}

export default InputField
