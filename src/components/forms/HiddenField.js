// @flow

import React from 'react'

type Props = {
  +name: string,
  +value?: string
}

class HiddenField extends React.Component {
  props: Props

  render() {
    const value = this.props.value ? this.props.value : ''

    return (
      <input id={this.props.name} type='hidden' value={value} />
    )
  }
}

export default HiddenField
