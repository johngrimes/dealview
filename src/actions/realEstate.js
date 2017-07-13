import { createObjectActions } from './objects.js'
import AssetActions from './assets.js'
import { putObject, deleteObject, getAllObjects } from '../data/db.js'
import { realEstateToAsset } from '../data/realEstate.js'

const objectStore = 'Asset.RealEstate'

const actions = createObjectActions(
  'REAL_ESTATE',
  'REAL_ESTATE',
  'RealEstate',
  'RealEstate'
)

const putRealEstate = realEstate => {
  return dispatch => {
    dispatch(actions.putRealEstateRequest(realEstate))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, realEstate)
        dispatch(actions.putRealEstateSuccess(saved))
        await dispatch(AssetActions.putAsset(realEstateToAsset(saved)))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putRealEstateFailure(error.message))
        reject(error)
      }
    })
  }
}

const deleteRealEstate = id => {
  return dispatch => {
    dispatch(actions.deleteRealEstateRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const deletedId = await deleteObject(objectStore, id)
        dispatch(AssetActions.deleteAsset(deletedId))
        dispatch(actions.deleteRealEstateSuccess(deletedId))
        resolve(deletedId)
      } catch (error) {
        dispatch(actions.deleteRealEstateFailure(error.message))
        reject(error)
      }
    })
  }
}

const loadRealEstate = () => {
  return dispatch => {
    dispatch(actions.loadRealEstateRequest())
    return new Promise((resolve, reject) => {
      getAllObjects(objectStore)
        .then(assets => {
          dispatch(actions.loadRealEstateSuccess(assets))
          resolve(assets)
        })
        .catch(error => {
          dispatch(actions.loadRealEstateFailure(error.message))
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
