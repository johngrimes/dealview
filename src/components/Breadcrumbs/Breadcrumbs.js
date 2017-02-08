import React from 'react'

import type { Route } from '../../routing.js'

import './Breadcrumbs.css'

export type Breadcrumb = {
  display: string,
  path: string
}

// Takes an array of Breadcrumb objects and returns an array of links, each
// wrapped in a list item.
const breadcrumbLinks = (breadcrumbs: Array<Breadcrumb>): Array<React$Element> => {
  const breadcrumbsCopy = breadcrumbs.slice()
  const breadcrumb = breadcrumbsCopy.pop()

  if (breadcrumb) {
    const breadcrumbLink = <li className='breadcrumbs-item' key={breadcrumb.path}>
                             <a className='breadcrumbs-link' href={breadcrumb.path}>
                               {breadcrumb.display}
                             </a>
                           </li>
    const newBreadcrumbLinks = breadcrumbLinks(breadcrumbsCopy)

    newBreadcrumbLinks.push(breadcrumbLink)

    return newBreadcrumbLinks
  }

  return []
}

type Props = {
  route: Route
}

// A Component that displays a breadcrumb trail, based on a set of routes
// passed in via the `routes` prop.
class Breadcrumbs extends React.Component {
  props: Props

  render() {
    console.log('Breadcrumbs props', this.props)
    return (
      <div className='breadcrumbs'>
        <ul className='breadcrumbs-list'>
          {breadcrumbLinks(this.props.route.breadcrumbs)}
        </ul>
      </div>
    )
  }
}

export default Breadcrumbs
