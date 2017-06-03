// @flow

import React from 'react'

type Props = {
  +name: string,
  +value?: string
}

class HiddenField extends React.Component {
  props: Props

  render() {
    return (
      <input id={this.props.name} type='hidden' value={this.props.value} />
    )
  }
}

export default HiddenField
