import { createObjectsReducer, InitialObjectStoreState } from './objects.js'

export const InitialLiabilityState = InitialObjectStoreState

const LiabilityReducer = createObjectsReducer('LIABILITY', 'LIABILITIES')

export default LiabilityReducer
