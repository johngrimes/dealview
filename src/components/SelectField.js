import React from 'react'

class SelectField extends React.Component {
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

  componentWillReceiveProps(props) {
    this.setState(() => ({ value: props.value }))
  }

  setFocus() {
    if (this.props.focus === this.props.name) {
      this.ref.focus()
    }
  }
  componentDidMount() {
    this.setFocus()
  }
  componentDidUpdate() {
    this.setFocus()
  }

  render() {
    const { name, options, label, errors, forceErrorDisplay } = this.props
    const { value, touched } = this.state

    const optionTags = options.map(option => {
      const props = {
        key: option[1],
        label: option[0],
        value: option[1],
      }
      return <option {...props} />
    })
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
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      ref: input => (this.ref = input),
    }

    return (
      <div className='control-group'>
        {labelTag}
        <select {...props}>
          {optionTags}
        </select>
        {(forceErrorDisplay || touched) &&
          errorTags.length > 0 &&
          <div className='errors'>
            {errorTags}
          </div>}
      </div>
    )
  }
}

export default SelectField
