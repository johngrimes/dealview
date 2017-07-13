import { createObjectsReducer, InitialObjectStoreState } from './objects.js'

export const InitialRealEstateState = InitialObjectStoreState

const RealEstateReducer = createObjectsReducer('REAL_ESTATE', 'REAL_ESTATE')

export default RealEstateReducer
