// @flow

import { takeEvery, call, put, all } from 'redux-saga/effects'

import * as RealEstateActions from 'actions/realEstate'
import { putObject, deleteObject, getAllObjects } from 'db/db'
import type { PutRealEstateRequestAction, DeleteRealEstateRequestAction } from 'actions/realEstate'

const objectStore = 'Asset.RealEstate'

export function* watchPutRealEstate() {
  yield takeEvery('PUT_REAL_ESTATE_REQUEST', putRealEstate)
}

export function* putRealEstate(action: PutRealEstateRequestAction) {
  try {
    const saved = yield call(putObject, objectStore, action.realEstate)
    yield put(RealEstateActions.putRealEstateSuccess(saved))
  } catch (error) {
    yield put(RealEstateActions.putRealEstateFailure(error))
  }
}

function* watchDeleteRealEstate() {
  yield takeEvery('DELETE_REAL_ESTATE_REQUEST', deleteRealEstate)
}

function* deleteRealEstate(action: DeleteRealEstateRequestAction) {
  try {
    const id = yield call(deleteObject, objectStore, action.id)
    yield put(RealEstateActions.deleteRealEstateSuccess(id))
  } catch (error) {
    yield put(RealEstateActions.deleteRealEstateFailure(error))
  }
}

function* watchLoadRealEstate() {
  yield takeEvery('LOAD_REAL_ESTATE_REQUEST', loadRealEstate)
}

function* loadRealEstate() {
  try {
    const realEstate = yield call(getAllObjects, objectStore)
    yield put(RealEstateActions.loadRealEstateSuccess(realEstate))
  } catch (error) {
    yield put(RealEstateActions.loadRealEstateFailure(error))
  }
}

export default function* watchRealEstate(): void {
  yield all([
    watchPutRealEstate(),
    watchDeleteRealEstate(),
    watchLoadRealEstate(),
  ])
}
