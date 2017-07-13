import { createObjectsReducer, InitialObjectStoreState } from './objects.js'

export const InitialAssetState = InitialObjectStoreState

const AssetsReducer = createObjectsReducer('ASSET', 'ASSETS')

export default AssetsReducer
