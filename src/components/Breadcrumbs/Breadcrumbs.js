import React from 'react'
import { connect } from 'react-redux'

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
  route: String
}

// A Component that displays a breadcrumb trail, based on a set of routes
// passed in via the `routes` prop.
class Breadcrumbs extends React.Component {
  props: Props

  constructor(props) {
    super(props)
    console.log('props', props)
    if (props.route.pathname === '/portfolio/assets/real-estate/new') {
      this.state = { breadcrumbs: [
        { display: 'Assets', path: '/portfolio/assets' },
        { display: 'New Real Estate Asset', path: '/portfolio/assets/real-estate/new' }
      ]}
    } else {
      this.state = { breadcrumbs: [] }
    }
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

const mapStateToProps = (state) => {
  return { route: state.app.route }
}

export default connect(mapStateToProps)(Breadcrumbs)
