// @flow

import { putObject, deleteObject, getAllObjects } from 'db/db'
import AssetActions from 'actions/assets/assets'
import { realEstateToAsset } from 'types/assets/realEstate'
import { createObjectActions } from 'actions/objects'
import type { RealEstate } from 'types/assets/realEstate'
import type { Thunk } from 'types/commonTypes'

const objectStore = 'Asset.RealEstate'

const actions = createObjectActions('REAL_ESTATE', 'REAL_ESTATE',
                                    'RealEstate', 'RealEstate')

const putRealEstate = (realEstate: RealEstate): Thunk => {
  return dispatch => {
    dispatch(actions.putRealEstateRequest(realEstate))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, realEstate)
        dispatch(actions.putRealEstateSuccess(saved))
        await dispatch(AssetActions.putAsset(realEstateToAsset(saved)))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putRealEstateFailure(error))
        reject(error)
      }
    })
  }
}

const deleteRealEstate = (id: string): Thunk => {
  return dispatch => {
    dispatch(actions.deleteRealEstateRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const deletedId = await deleteObject(objectStore, id)
        dispatch(AssetActions.deleteAsset(deletedId))
        dispatch(actions.deleteRealEstateSuccess(deletedId))
        resolve(deletedId)
      } catch (error) {
        dispatch(actions.deleteRealEstateFailure(error))
        reject(error)
      }
    })
  }
}

const loadRealEstate = (): Thunk => {
  return dispatch => {
    dispatch(actions.loadRealEstateRequest())
    return new Promise((resolve, reject) => {
      getAllObjects(objectStore).then(assets => {
        dispatch(actions.loadRealEstateSuccess(assets))
        resolve(assets)
      }).catch(error => {
        dispatch(actions.loadRealEstateFailure(error))
        reject(error)
      })
    })
  }
}

export default {
  ...actions,
  putRealEstate,
  deleteRealEstate,
  loadRealEstate,
}
