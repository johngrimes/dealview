import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import AssetForm from './AssetForm.js'
import Breadcrumbs from './Breadcrumbs.js'
import NotFound from './NotFound.js'
import AssetActions from '../actions/assets.js'

import './styles/EditAsset.css'

export class EditAsset extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.asset.status === 'uninitialised') {
      this.props.dispatch(AssetActions.loadAssets())
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  breadcrumbs() {
    const { id, asset: { object: asset } } = this.props
    const assetName = typeof asset === 'undefined' ? id : asset.name
    return [
      { display: 'Portfolio', path: '/portfolio' },
      { display: 'Assets', path: '/portfolio/assets' },
      { display: assetName, path: `/portfolio/assets/${id}` },
    ]
  }

  handleSubmit(asset) {
    this.props.dispatch(AssetActions.putAsset(asset))
    this.props.history.push('/portfolio/assets')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset.status === 'uninitialised') {
      this.props.dispatch(AssetActions.loadAssets())
    }
  }

  render() {
    return typeof this.props.asset.object === 'undefined'
      ? <NotFound />
      : <div className='edit-asset'>
          <Breadcrumbs breadcrumbs={this.breadcrumbs()} />
          <AssetForm
            asset={this.props.asset.object}
            onSubmit={this.handleSubmit}
          />
        </div>
  }
}

EditAsset.propTypes = {
  id: PropTypes.string.isRequired,
  asset: PropTypes.shape({
    status: PropTypes.oneOf([ 'uninitialised', 'loading', 'loaded', 'error' ]),
    object: PropTypes.object,
  }),
}

const mapStateToProps = (state, ownProps) => {
  return {
    asset: {
      status: state.assets.status,
      object: state.assets.objects[ownProps.id],
    },
  }
}

export default connect(mapStateToProps)(withRouter(EditAsset))
