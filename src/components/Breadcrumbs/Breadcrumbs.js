// @flow

import React from 'react'
import type { Element } from 'react'

import Link from '../../components/Link.js'
import EventPublisher from '../../data/events/EventPublisher.js'
import type { Route } from '../../routing.js'

import './Breadcrumbs.css'

export type Breadcrumb = {
  display: string,
  path: string
}

const placeholderPattern = /{(\w+)}/g

type Props = {
  route: Route,
  eventPublisher?: EventPublisher
}

// A Component that displays a breadcrumb trail, based on a set of routes
// passed in via the `routes` prop.
class Breadcrumbs extends React.Component {
  props: Props

  // Takes an array of Breadcrumb objects and returns an array of links, each
  // wrapped in a list item.
  breadcrumbLinks(breadcrumbs: Array<Breadcrumb>): Array<Element<any>> {
    const breadcrumbsCopy = breadcrumbs.slice()
    const breadcrumb = breadcrumbsCopy.pop()

    if (breadcrumb) {
      const translated = this.translateBreadcrumb(breadcrumb)
      const breadcrumbLink = <li className='breadcrumbs-item' key={translated.path}>
                               <Link className='breadcrumbs-link' href={translated.path} eventPublisher={this.props.eventPublisher}>
                                 {translated.display}
                               </Link>
                             </li>
      const newBreadcrumbLinks = this.breadcrumbLinks(breadcrumbsCopy)

      newBreadcrumbLinks.push(breadcrumbLink)

      return newBreadcrumbLinks
    }

    return []
  }

  // Translates placeholders to prop values within the fields of a supplied Breadcrumb.
  translateBreadcrumb(breadcrumb: Breadcrumb): Breadcrumb {
    const translated = {}
    translated.display = this.translateField(breadcrumb.display)
    translated.path = this.translateField(breadcrumb.path)
    return translated
  }

  // Translates placeholders to prop values within a string.
  translateField(field: string): string {
    return field.replace(placeholderPattern, this.translate.bind(this))
  }

  // Replaces a matched placeholder with the corresponding prop value.
  //
  // This is a callback function compatible with the JavaScript String replace function, see:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
  translate(match: string, ...args: string[]): string {
    const placeholder = args[0]
    return this.props[placeholder]
  }

  render() {
    return this.props.route.breadcrumbs ? (
      <div className='breadcrumbs'>
        <ul className='breadcrumbs-list'>
          {this.breadcrumbLinks(this.props.route.breadcrumbs)}
        </ul>
      </div>
    ) : null
  }
}

export default Breadcrumbs
