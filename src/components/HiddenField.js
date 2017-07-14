import React from 'react'
import PropTypes from 'prop-types'

class HiddenField extends React.Component {
  render() {
    const value = this.props.value ? this.props.value : ''

    return <input id={this.props.name} type='hidden' value={value} />
  }
}

HiddenField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default HiddenField
