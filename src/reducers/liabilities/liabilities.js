// @flow

import { createObjectsReducer, InitialObjectStoreState } from 'reducers/objects'
import type { ObjectStoreState } from 'reducers/objects'
import type { LiabilityMap } from 'types/liabilities/liability'
import type { ObjectAction } from 'actions/objects'

export type LiabilityState = ObjectStoreState & { +objects: LiabilityMap }

export const InitialLiabilityState: LiabilityState = InitialObjectStoreState

const LiabilityReducer: (LiabilityState, ObjectAction) => LiabilityState =
  createObjectsReducer('LIABILITY', 'LIABILITIES')

export default LiabilityReducer
