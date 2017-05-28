// @flow

import { putObject, deleteObject, getAllObjects } from 'db/db'
import { putAssetRequest, putAssetSuccess, putAssetFailure,
         deleteAssetRequest, deleteAssetSuccess, deleteAssetFailure } from 'actions/assets'
import { realEstateToAsset } from 'types/assets/realEstate'
import type { RealEstate, RealEstateWithId, RealEstateMap } from 'types/assets/realEstate'
import type { Thunk } from 'types/commonTypes'

const objectStore = 'Asset.RealEstate'
const assetObjectStore = 'Asset'

type PutRealEstateRequestAction = {
  type: 'PUT_REAL_ESTATE_REQUEST',
}
type PutRealEstateSuccessAction = {
  type: 'PUT_REAL_ESTATE_SUCCESS',
  realEstate: RealEstateWithId,
}
type PutRealEstateFailureAction = {
  type: 'PUT_REAL_ESTATE_FAILURE',
  error: string|null,
}

type DeleteRealEstateRequestAction = {
  type: 'DELETE_REAL_ESTATE_REQUEST',
}
type DeleteRealEstateSuccessAction = {
  type: 'DELETE_REAL_ESTATE_SUCCESS',
  id: string,
}
type DeleteRealEstateFailureAction = {
  type: 'DELETE_REAL_ESTATE_FAILURE',
  error: string|null,
}

type LoadRealEstateRequestAction = {
  type: 'LOAD_REAL_ESTATE_REQUEST'
}
type LoadRealEstateSuccessAction = {
  type: 'LOAD_REAL_ESTATE_SUCCESS',
  realEstate: RealEstateMap,
}
type LoadRealEstateFailureAction = {
  type: 'LOAD_REAL_ESTATE_FAILURE',
  error: string|null,
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
    realEstate,
  }
}

export const putRealEstateFailure = (error: string|null): PutRealEstateFailureAction => {
  return {
    type: 'PUT_REAL_ESTATE_FAILURE',
    error,
  }
}

export const deleteRealEstateRequest = (): DeleteRealEstateRequestAction => {
  return { type: 'DELETE_REAL_ESTATE_REQUEST' }
}

export const deleteRealEstateSuccess = (id: string): DeleteRealEstateSuccessAction => {
  return {
    type: 'DELETE_REAL_ESTATE_SUCCESS',
    id,
  }
}

export const deleteRealEstateFailure = (error: string|null): DeleteRealEstateFailureAction => {
  return {
    type: 'DELETE_REAL_ESTATE_FAILURE',
    error,
  }
}

export const loadRealEstateRequest = (): LoadRealEstateRequestAction => {
  return { type: 'LOAD_REAL_ESTATE_REQUEST' }
}

export const loadRealEstateSuccess = (realEstate: RealEstateMap): LoadRealEstateSuccessAction => {
  return {
    type: 'LOAD_REAL_ESTATE_SUCCESS',
    realEstate,
  }
}

export const loadRealEstateFailure = (error: string|null): LoadRealEstateFailureAction => {
  return {
    type: 'LOAD_REAL_ESTATE_FAILURE',
    error,
  }
}

export const putRealEstate = (realEstate: RealEstate): Thunk => {
  return dispatch => {
    dispatch(putRealEstateRequest())
    return new Promise((resolve, reject) => {
      putObject(objectStore, realEstate).then(saved => {
        dispatch(putRealEstateSuccess(saved))
        const asset = realEstateToAsset(saved)
        dispatch(putAssetRequest())
        putObject(assetObjectStore, asset)
          .then(savedAsset => {
            dispatch(putAssetSuccess(savedAsset))
            resolve(saved)
          }).catch(error => {
            dispatch(putAssetFailure(error))
            dispatch(deleteRealEstateRequest())
            deleteObject(objectStore, saved.id).then(id => {
              dispatch(deleteRealEstateSuccess(id))
              reject(error)
            }).catch(error => {
              dispatch(deleteRealEstateFailure(error))
              reject(error)
            })
          })
      }).catch(error => {
        dispatch(putRealEstateFailure(error))
        reject(error)
      })
    })
  }
}

export const deleteRealEstate = (id: string): Thunk => {
  return dispatch => {
    dispatch(deleteRealEstateRequest())
    return new Promise((resolve, reject) => {
      deleteObject(objectStore, id).then(deletedId => {
        dispatch(deleteRealEstateSuccess(deletedId))
        dispatch(deleteAssetRequest())
        deleteObject(assetObjectStore, deletedId)
        .then(() => {
          dispatch(deleteAssetSuccess(deletedId))
          resolve(deletedId)
        }).catch(error => {
          dispatch(deleteAssetFailure(error))
          resolve(error)
        })
      }).catch(error => {
        dispatch(deleteRealEstateFailure(error))
        reject(error)
      })
    })
  }
}

export const loadRealEstate = (): Thunk => {
  return dispatch => {
    dispatch(loadRealEstateRequest())
    return new Promise((resolve, reject) => {
      getAllObjects(objectStore).then(assets => {
        dispatch(loadRealEstateSuccess(assets))
        resolve(assets)
      }).catch(error => {
        dispatch(loadRealEstateFailure(error))
        reject(error)
      })
    })
  }
}
