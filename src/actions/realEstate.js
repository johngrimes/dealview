// @flow

import type { RealEstate, RealEstateWithId, RealEstateMap } from 'types/assets/realEstate'

type PutRealEstateRequestAction = {
  type: 'PUT_REAL_ESTATE_REQUEST',
  realEstate: RealEstate,
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
  id: string,
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

export const putRealEstateRequest = (realEstate: RealEstate): PutRealEstateRequestAction => {
  return {
    type: 'PUT_REAL_ESTATE_REQUEST',
    realEstate,
  }
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
    realEstate,
  }
}

export const loadRealEstateFailure = (error: string|null): LoadRealEstateFailureAction => {
  return {
    type: 'LOAD_REAL_ESTATE_FAILURE',
    error,
  }
}
