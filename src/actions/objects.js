// @flow

import type { ObjectMap, ObjectWithId } from 'types/commonTypes'

type PutObjectRequestAction = {
  +type: string,
  +object: Object,
}
type PutObjectSuccessAction = {
  +type: string,
  +object: ObjectWithId,
}
type PutObjectFailureAction = {
  +type: string,
  +error?: string,
}

type DeleteObjectRequestAction = {
  +type: string,
  +id: string,
}
type DeleteObjectSuccessAction = {
  +type: string,
  +id: string,
}
type DeleteObjectFailureAction = {
  +type: string,
  +error?: string,
}

type LoadObjectsRequestAction = {
  +type: string,
}
type LoadObjectsSuccessAction = {
  +type: string,
  +objects: ObjectMap,
}
type LoadObjectsFailureAction = {
  +type: string,
  +error?: string
}

export type ObjectAction = PutObjectRequestAction
                         | PutObjectSuccessAction
                         | PutObjectFailureAction
                         | DeleteObjectRequestAction
                         | DeleteObjectRequestAction
                         | DeleteObjectFailureAction
                         | LoadObjectsRequestAction
                         | LoadObjectsSuccessAction
                         | LoadObjectsFailureAction

export type ObjectActions = { +[string]: (any) => ObjectAction }

export const createObjectActions = (name: string, pluralName: string,
                                    nameTitled: string, pluralNameTitled: string): ObjectActions => {
  return {
    [`put${nameTitled}Request`]: (object: Object): PutObjectRequestAction => ({
      type: `PUT_${name}_REQUEST`,
      object,
    }),
    [`put${nameTitled}Success`]: (object: ObjectWithId): PutObjectSuccessAction => ({
      type: `PUT_${name}_SUCCESS`,
      object,
    }),
    [`put${nameTitled}Failure`]: (error?: string): PutObjectFailureAction => ({
      type: `PUT_${name}_FAILURE`,
      error,
    }),
    [`delete${nameTitled}Request`]: (id: string): DeleteObjectRequestAction => ({
      type: `DELETE_${name}_REQUEST`,
      id,
    }),
    [`delete${nameTitled}Success`]: (id: string): DeleteObjectSuccessAction => ({
      type: `DELETE_${name}_SUCCESS`,
      id,
    }),
    [`delete${nameTitled}Failure`]: (error?: string): DeleteObjectFailureAction => ({
      type: `DELETE_${name}_FAILURE`,
      error,
    }),
    [`load${pluralNameTitled}Request`]: (): LoadObjectsRequestAction => ({
      type: `LOAD_${pluralName}_REQUEST`,
    }),
    [`load${pluralNameTitled}Success`]: (objects: ObjectMap): LoadObjectsSuccessAction => ({
      type: `LOAD_${pluralName}_SUCCESS`,
      objects,
    }),
    [`load${pluralNameTitled}Failure`]: (error?: string): LoadObjectsFailureAction => ({
      type: `LOAD_${pluralName}_FAILURE`,
      error,
    }),
  }
}
