import React from 'react'

class InputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      touched: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(event) {
    const target = event.target
    this.setState(
      () => ({ value: target.value, touched: true }),
      () => {
        if (this.props.onChange) this.props.onChange(target.value)
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
    this.setState(() => ({ value: props.value }))
  }

  componentDidMount() {
    this.setFocus()
  }

  componentDidUpdate() {
    this.setFocus()
  }

  render() {
    const { name, type, label, placeholder, min, errors, forceErrorDisplay } = this.props
    const { touched } = this.state
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
    const className = touched && errorTags.length > 0 ? 'with-errors' : ''
    const props = {
      name,
      className,
      type,
      placeholder,
      min,
      value,
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
