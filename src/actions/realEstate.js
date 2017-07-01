// @flow

import { putObject, deleteObject, getAllObjects } from 'db/db'
import { putAsset, deleteAsset } from 'actions/assets'
import { realEstateToAsset } from 'types/assets/realEstate'
import type { RealEstate, RealEstateWithId, RealEstateMap } from 'types/assets/realEstate'
import type { Thunk } from 'types/commonTypes'

const objectStore = 'Asset.RealEstate'

type PutRealEstateRequestAction = {
  +type: 'PUT_REAL_ESTATE_REQUEST',
  +object: RealEstate,
}
type PutRealEstateSuccessAction = {
  +type: 'PUT_REAL_ESTATE_SUCCESS',
  +object: RealEstateWithId,
}
type PutRealEstateFailureAction = {
  +type: 'PUT_REAL_ESTATE_FAILURE',
  +error: string|null,
}

type DeleteRealEstateRequestAction = {
  +type: 'DELETE_REAL_ESTATE_REQUEST',
  +id: string,
}
type DeleteRealEstateSuccessAction = {
  +type: 'DELETE_REAL_ESTATE_SUCCESS',
  +id: string,
}
type DeleteRealEstateFailureAction = {
  +type: 'DELETE_REAL_ESTATE_FAILURE',
  +error: string|null,
}

type LoadRealEstateRequestAction = {
  +type: 'LOAD_REAL_ESTATE_REQUEST'
}
type LoadRealEstateSuccessAction = {
  +type: 'LOAD_REAL_ESTATE_SUCCESS',
  +objects: RealEstateMap,
}
type LoadRealEstateFailureAction = {
  +type: 'LOAD_REAL_ESTATE_FAILURE',
  +error: string|null,
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

export const putRealEstateRequest = (realEstate: RealEstate): PutRealEstateRequestAction => {
  return {
    type: 'PUT_REAL_ESTATE_REQUEST',
    object: realEstate,
  }
}

export const putRealEstateSuccess = (realEstate: RealEstateWithId): PutRealEstateSuccessAction => {
  return {
    type: 'PUT_REAL_ESTATE_SUCCESS',
    object: realEstate,
  }
}

export const putRealEstateFailure = (error: string|null): PutRealEstateFailureAction => {
  return {
    type: 'PUT_REAL_ESTATE_FAILURE',
    error,
  }
}

export const deleteRealEstateRequest = (id: string): DeleteRealEstateRequestAction => {
  return {
    type: 'DELETE_REAL_ESTATE_REQUEST',
    id,
  }
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
    objects: realEstate,
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
    dispatch(putRealEstateRequest(realEstate))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, realEstate)
        dispatch(putRealEstateSuccess(saved))
        await dispatch(putAsset(realEstateToAsset(saved)))
        resolve(saved)
      } catch (error) {
        dispatch(putRealEstateFailure(error))
        reject(error)
      }
    })
  }
}

export const deleteRealEstate = (id: string): Thunk => {
  return dispatch => {
    dispatch(deleteRealEstateRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const deletedId = await deleteObject(objectStore, id)
        dispatch(deleteAsset(deletedId))
        dispatch(deleteRealEstateSuccess(deletedId))
        resolve(deletedId)
      } catch (error) {
        dispatch(deleteRealEstateFailure(error))
        reject(error)
      }
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
