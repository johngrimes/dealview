import type { Asset, AssetWithId } from 'types/assets/asset'

export const validAsset1: Asset = {
  type: 'RealEstate',
  name: '5 Sunrise St',
  startDate: '2014-09-10',
  valuations: [
    { date: '2014-09-10', amount: 520000, note: 'Purchase price', type: 'purchase' },
    { date: '2016-04-15', amount: 705000, note: 'Formal valuation', type: 'none' },
  ],
}
export const validAssetWithId1: AssetWithId = { ...validAsset1, id: '98' }

export const validAsset2: Asset = {
  type: 'RealEstate',
  name: '38/8 Briggs Road',
  startDate: '2014-05-10',
  valuations: [
    { date: '2014-05-10', amount: 165000, note: 'Purchase price', type: 'purchase' },
    { date: '2015-09-10', amount: 260000, note: 'Formal valuation', type: 'none' },
  ],
}
export const validAssetWithId2: AssetWithId = { ...validAsset2, id: '99' }
