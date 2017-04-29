// @flow

export type Asset = {
  type: 'RealEstate',
  instanceId: string,
  name: string,
  lastValuation?: number,
  startDate?: string,
  endDate?: string
}

export type AssetWithId = Asset & { id: string }

export type AssetMap = { [id: string]: AssetWithId }
