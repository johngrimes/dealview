import React from 'react'
import { Link } from 'react-router'

import './Breadcrumbs.css'

export type Breadcrumb = {
  display: string,
  path: string
}

type Component = {
  breadcrumb?: Breadcrumb
}

export type Route = {
  component?: Component
}

// Recursive function that walks the supplied `routes` object, calling the
// `breadcrumb` function on each component.
const getBreadcrumbsFromRoutes = (routes: Array<Route>): Array<Breadcrumb> => {
  const tail = routes.slice(1)
  const head = routes[0]

  if (!head) {
    return []
  } else if (head.component && head.component.breadcrumb) {
    const breadcrumb = head.component.breadcrumb()
    const newBreadcrumbs = getBreadcrumbsFromRoutes(tail)
    newBreadcrumbs.push(breadcrumb)
    return newBreadcrumbs
  }
  return getBreadcrumbsFromRoutes(tail)
}

// Takes an array of Breadcrumb objects and returns an array of links, each
// wrapped in a list item.
const breadcrumbLinks = (breadcrumbs: Array<Breadcrumb>): Array<React$Element> => {
  const breadcrumbsCopy = breadcrumbs.slice()
  const breadcrumb = breadcrumbsCopy.pop()

  if (breadcrumb) {
    const breadcrumbLink = <li className='breadcrumbs-item' key={breadcrumb.path}>
                             <Link className='breadcrumbs-link' to={breadcrumb.path}>
                               {breadcrumb.display}
                             </Link>
                           </li>
    const newBreadcrumbLinks = breadcrumbLinks(breadcrumbsCopy)

    newBreadcrumbLinks.unshift(breadcrumbLink)

    return newBreadcrumbLinks
  }

  return []
}

type Props = {
  routes: Array<Route>
}

// A Component that displays a breadcrumb trail, based on a set of routes
// passed in via the `routes` prop.
class Breadcrumbs extends React.Component {
  props: Props

  constructor(props) {
    super(props)
    this.state = { breadcrumbs: getBreadcrumbsFromRoutes(props.routes) }
  }

  render() {
    return (
      <div className='breadcrumbs'>
        <ul className='breadcrumbs-list'>
          {breadcrumbLinks(this.state.breadcrumbs)}
        </ul>
      </div>
    )
  }
}

export default Breadcrumbs
