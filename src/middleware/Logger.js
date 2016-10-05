// @flow

import type { Store, Dispatch, MiddlewareAPI, Action } from 'redux'

const Logger = (store: MiddlewareAPI): Function =>
               (next: Dispatch) =>
               (action: Action): Action => {
  console.group(action.type)
  console.log('store.getState()', store.getState())
  console.log('next', next)
  console.log('action', action)
  const result: Action = next(action)  // eslint-disable-line callback-return
  console.log('result', result)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

export default Logger
