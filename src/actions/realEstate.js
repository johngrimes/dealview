// @flow

import moment from 'moment'

import { getDatabase } from '../data/database.js'
import { putObject, deleteObject, loadObjects } from './objects.js'
import { putAssetRequest, putAssetSuccess, putAssetFailure,
         deleteAssetRequest, deleteAssetSuccess, deleteAssetFailure } from './assets.js'
import { DateFormat } from '../data/commonTypes.js'
import type { Asset, AssetWithId } from '../data/assets/asset.js'
import type { RealEstate, RealEstateWithId, RealEstateMap } from '../data/assets/realEstate.js'
import type { Valuation } from '../components/forms/ValuationsInput.js'
import type { Thunk } from '../data/commonTypes.js'

const objectStore = 'Asset.RealEstate'
const assetObjectStore = 'Asset'

type PutRealEstateRequestAction = {
  type: 'PUT_REAL_ESTATE_REQUEST'
}
type PutRealEstateSuccessAction = {
  type: 'PUT_REAL_ESTATE_SUCCESS',
  realEstate: RealEstateWithId
}
type PutRealEstateFailureAction = {
  type: 'PUT_REAL_ESTATE_FAILURE',
  error: string|null
}

type DeleteRealEstateRequestAction = {
  type: 'DELETE_REAL_ESTATE_REQUEST'
}
type DeleteRealEstateSuccessAction = {
  type: 'DELETE_REAL_ESTATE_SUCCESS',
  id: string
}
type DeleteRealEstateFailureAction = {
  type: 'DELETE_REAL_ESTATE_FAILURE',
  error: string|null
}

type LoadRealEstateRequestAction = {
  type: 'LOAD_REAL_ESTATE_REQUEST'
}
type LoadRealEstateSuccessAction = {
  type: 'LOAD_REAL_ESTATE_SUCCESS',
  realEstate: RealEstateMap
}
type LoadRealEstateFailureAction = {
  type: 'LOAD_REAL_ESTATE_FAILURE',
  error: string|null
}

export type RealEstateAction = PutRealEstateRequestAction
                             | PutRealEstateSuccessAction
                             | PutRealEstateFailureAction
                             | DeleteRealEstateRequestAction
                             | DeleteRealEstateRequestAction
                             | DeleteRealEstateFailureAction
                             | LoadRealEstateRequestAction
                             | LoadRealEstateSuccessAction
                             | LoadRealEstateFailureAction

export const putRealEstateRequest = (): PutRealEstateRequestAction => {
  return { type: 'PUT_REAL_ESTATE_REQUEST' }
}

export const putRealEstateSuccess = (realEstate: RealEstateWithId): PutRealEstateSuccessAction => {
  return {
    type: 'PUT_REAL_ESTATE_SUCCESS',
    realEstate
  }
}

export const putRealEstateFailure = (error: string|null): PutRealEstateFailureAction => {
  return {
    type: 'PUT_REAL_ESTATE_FAILURE',
    error
  }
}

export const deleteRealEstateRequest = (): DeleteRealEstateRequestAction => {
  return { type: 'DELETE_REAL_ESTATE_REQUEST' }
}

export const deleteRealEstateSuccess = (id: string): DeleteRealEstateSuccessAction => {
  return {
    type: 'DELETE_REAL_ESTATE_SUCCESS',
    id
  }
}

export const deleteRealEstateFailure = (error: string|null): DeleteRealEstateFailureAction => {
  return {
    type: 'DELETE_REAL_ESTATE_FAILURE',
    error
  }
}

export const loadRealEstateRequest = (): LoadRealEstateRequestAction => {
  return { type: 'LOAD_REAL_ESTATE_REQUEST' }
}

export const loadRealEstateSuccess = (realEstate: RealEstateMap): LoadRealEstateSuccessAction => {
  return {
    type: 'LOAD_REAL_ESTATE_SUCCESS',
    realEstate
  }
}

export const loadRealEstateFailure = (error: string|null): LoadRealEstateFailureAction => {
  return {
    type: 'LOAD_REAL_ESTATE_FAILURE',
    error
  }
}

export const putRealEstate = (realEstate: RealEstate): Thunk => {
  return dispatch => {
    const putRealEstate = putObject(objectStore, realEstate,
                                    putRealEstateRequest, putRealEstateSuccess, putRealEstateFailure)
    dispatch(putRealEstate).then(saved => {
      const asset = realEstateToAsset(saved)
      getAssetRecordForRealEstate(saved.id.toString())
        .then(existingAsset => {
          dispatch(putObject(assetObjectStore, { ...asset, id: existingAsset.id },
                             putAssetRequest, putAssetSuccess, putAssetFailure))
        })
        .catch(() => {
          dispatch(putObject(assetObjectStore, asset,
                             putAssetRequest, putAssetSuccess, putAssetFailure))
        })
    })
  }
}

export const deleteRealEstate = (id: string): Thunk => {
  return dispatch => {
    getAssetRecordForRealEstate(id).then(asset => {
      const deleteAsset = deleteObject(assetObjectStore, asset.id,
                                       deleteAssetRequest, deleteAssetSuccess, deleteAssetFailure)
      const deleteRealEstate = deleteObject(objectStore, id,
                                            deleteRealEstateRequest, deleteRealEstateSuccess, deleteRealEstateFailure)
      dispatch(deleteAsset).then(() => { dispatch(deleteRealEstate) })
    })
  }
}

export const loadRealEstate = (): Thunk => {
  return dispatch => {
    dispatch(loadObjects(objectStore,
                         loadRealEstateRequest, loadRealEstateSuccess, loadRealEstateFailure))
  }
}

const getAssetRecordForRealEstate = (realEstateId: string): Promise<AssetWithId> => {
  return new Promise((resolve, reject) => {
    getDatabase().then(db => {
      const transaction = db.transaction(['Asset'], 'readonly')
      const store = transaction.objectStore('Asset')
      const index = store.index('type, instanceId')
      const request = index.get(['RealEstate', realEstateId])
      request.onsuccess = event => {
        typeof event.target.result === 'undefined'
        ? reject()
        : resolve(event.target.result)
      }
      request.onerror = () => { reject() }
    })
  })
}

const realEstateToAsset = (realEstate: RealEstate): Asset => {
  const lastValuation = getLastValuation(realEstate)
  const asset = {}
  asset.type = 'RealEstate'
  asset.name = realEstate.name
  if (typeof realEstate.id === 'number') { asset.instanceId = realEstate.id.toString() }
  if (realEstate.purchaseDate) { asset.startDate = realEstate.purchaseDate }
  if (realEstate.saleDate) { asset.startDate = realEstate.saleDate }
  if (lastValuation) { asset.lastValuation = lastValuation.amount }
  return asset
}

export const getLastValuation = (realEstate: RealEstate): Valuation|false => {
  if (realEstate.valuations.length === 0) {
    return false
  }
  const sortedValuations = realEstate.valuations.slice().sort(compareValuationsByDate)
  const idxFuture = sortedValuations.findIndex(v => { moment(v.date, DateFormat).valueOf() > moment().valueOf() })
  const slicedValuations = sortedValuations.slice(0, idxFuture)
  return slicedValuations[slicedValuations.length - 1]
}

const compareValuationsByDate = (a: Valuation, b: Valuation): number => {
  const [milliA, milliB] = [a, b].map(v => { return v.date ? moment(v.date).valueOf() : 0 })
  return milliA - milliB
}
