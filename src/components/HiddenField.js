import React from 'react'

class HiddenField extends React.Component {
  render() {
    const value = this.props.value ? this.props.value : ''

    return <input id={this.props.name} type='hidden' value={value} />
  }
}

export default HiddenField
