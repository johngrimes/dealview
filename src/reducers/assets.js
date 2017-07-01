// @flow

import { createObjectsReducer, InitialObjectStoreState } from 'reducers/objects'
import type { ObjectStoreState } from 'reducers/objects'
import type { AssetMap } from 'types/assets/asset'
import type { AssetAction } from 'actions/assets'

export type AssetState = ObjectStoreState & { +objects: AssetMap }

export const InitialAssetState: AssetState = InitialObjectStoreState

const AssetsReducer: (AssetState, AssetAction) => AssetState =
  createObjectsReducer('ASSET', 'ASSETS')

export default AssetsReducer
