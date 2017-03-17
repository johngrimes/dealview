// @flow

import CreateRealEstate from './components/assets/real-estate/CreateRealEstate.js'
import EditRealEstate from './components/assets/real-estate/EditRealEstate.js'
import type { Routes } from './routing.js'

export const routes: Routes = [
  { route: '/portfolio/assets/real-estate/new',
    componentClass: CreateRealEstate,
    breadcrumbs: [
      { display: 'Assets', path: '/portfolio/assets' },
      { display: 'New Real Estate Asset', path: '/portfolio/assets/real-estate/new' }
    ]
  },
  { route: '/portfolio/assets/real-estate/:id/edit',
    componentClass: EditRealEstate,
    breadcrumbs: [
      { display: 'Assets', path: '/portfolio/assets' },
      { display: '{name}', path: '/portfolio/assets/real-estate/{id}/edit' }
    ]
  }
]
