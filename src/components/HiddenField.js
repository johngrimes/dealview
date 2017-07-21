import React from 'react'
import PropTypes from 'prop-types'

class HiddenField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }

  render() {
    const value = this.props.value ? this.props.value : ''

    return <input id={this.props.name} type='hidden' value={value} />
  }
}

export default HiddenField
