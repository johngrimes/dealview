// @flow

import type { Asset, AssetWithId } from '../../data/assets/asset.js'

export const validAsset1: Asset = {
  type: 'RealEstate',
  instanceId: '54',
  name: '5 Sunrise St',
  lastValuation: 705000
}
export const validAssetWithId1: AssetWithId = { ...validAsset1, id: '98' }

export const validAsset2: Asset = {
  type: 'RealEstate',
  instanceId: '34',
  name: '38/8 Briggs Road',
  lastValuation: 260000
}
export const validAssetWithId2: AssetWithId = { ...validAsset2, id: '99' }
