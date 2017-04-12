// @flow

export type Asset = {
  type: 'RealEstate',
  instanceId: string,
  name: string,
  lastValuation?: number
}

export type AssetWithId = Asset & { id: string }

export type AssetMap = { [id: string]: AssetWithId }
