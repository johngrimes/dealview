// @flow

import { save as saveToDatabase, load as loadFromDatabase, loadAll as loadAllFromDatabase } from '../database.js'

import type { Values } from '../database.js'

export type AssetValues = {
  id?: string,
  type: 'RealEstate',
  instanceId: string,
  name: string,
  lastValuation?: number
}

export const save = (values: Values): Promise<string> => {
  return saveToDatabase('Asset', values)
}

export const load = (id: string): Promise<AssetValues> => {
  return loadFromDatabase('Asset', id)
}

export const loadAll = (): Promise<AssetValues[]> => {
  return loadAllFromDatabase('Asset')
}
