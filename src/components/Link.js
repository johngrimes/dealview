// @flow

import React from 'react'
import type { Children } from 'react'

import EventPublisher from '../data/events/EventPublisher.js'

type Props = {
  className: string,
  href: string,
  eventPublisher: EventPublisher,
  children?: Children
}

class Link extends React.Component {
  props: Props
  handleClick: (event: Event) => void

  constructor(props: Props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event: Event) {
    if (event.currentTarget instanceof HTMLAnchorElement) {
      const target: HTMLAnchorElement = event.currentTarget
      window.history.pushState({}, '', target.pathname)
      this.props.eventPublisher.publish('Navigate', { path: target.pathname })
      event.preventDefault()
    }
  }

  render() {
    return (
      <a onClick={this.handleClick} className={this.props.className} href={this.props.href}>{this.props.children}</a>
    )
  }
}

export default Link
