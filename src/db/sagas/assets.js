// @flow

import { take, takeEvery, fork, call, put, all } from 'redux-saga/effects'

import * as AssetActions from 'actions/realEstate'
import { putObject, deleteObject, getAllObjects } from 'db/db'
import type { Asset } from 'types/assets/asset'
import type { DeleteAssetRequestAction } from 'assets/actions'

const objectStore = 'Asset'

function* watchPutAsset() {
  while (true) {
    const assetAction = ('PUT_ASSET_REQUEST')
    yield fork(putAsset, assetAction.asset)
    const realEstateAction = yield take('PUT_REAL_ESTATE_REQUEST')
    yield fork(putAsset, realEstateAction.realEstate)
  }
}

function* putAsset(asset: Asset) {
  try {
    const saved = yield call(putObject, objectStore, asset)
    yield put(AssetActions.PutAssetSuccessAction(saved))
  } catch (error) {
    yield put(AssetActions.PutAssetFailureAction(error))
  }
}

function* watchDeleteAsset() {
  yield takeEvery('DELETE_ASSET_REQUEST', deleteAsset)
}

function* deleteAsset(action: DeleteAssetRequestAction) {
  try {
    const id = yield call(deleteObject, objectStore, action.id)
    yield put(AssetActions.DeleteAssetSuccessAction(id))
  } catch (error) {
    yield put(AssetActions.DeleteAssetFailureAction(error))
  }
}

function* watchLoadAsset() {
  yield takeEvery('LOAD_ASSET_REQUEST', loadAsset)
}

function* loadAsset() {
  try {
    const realEstate = yield call(getAllObjects, objectStore)
    yield put(AssetActions.LoadAssetSuccessAction(realEstate))
  } catch (error) {
    yield put(AssetActions.LoadAssetFailureAction(error))
  }
}

export function* watchAssets() {
  yield all([
    watchPutAsset(),
    watchDeleteAsset(),
    watchLoadAsset(),
  ])
}
