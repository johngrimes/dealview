// @flow

import { createObjectsReducer, InitialObjectStoreState } from 'reducers/objects'
import type { ObjectStoreState } from 'reducers/objects'
import type { AssetMap } from 'types/assets/asset'
import type { ObjectAction } from 'actions/objects'

export type AssetState = ObjectStoreState & { +objects: AssetMap }

export const InitialAssetState: AssetState = InitialObjectStoreState

const AssetsReducer: (AssetState, ObjectAction) => AssetState =
  createObjectsReducer('ASSET', 'ASSETS')

export default AssetsReducer
