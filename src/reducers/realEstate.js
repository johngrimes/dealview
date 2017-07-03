// @flow

import { createObjectsReducer, InitialObjectStoreState } from 'reducers/objects'
import type { ObjectStoreState } from 'reducers/objects'
import type { RealEstateMap } from 'types/assets/realEstate'
import type { ObjectAction } from 'actions/objects'

export type RealEstateState = ObjectStoreState & { +objects: RealEstateMap }

export const InitialRealEstateState: RealEstateState = InitialObjectStoreState

const RealEstateReducer: (RealEstateState, ObjectAction) => RealEstateState =
  createObjectsReducer('REAL_ESTATE', 'REAL_ESTATE')

export default RealEstateReducer
