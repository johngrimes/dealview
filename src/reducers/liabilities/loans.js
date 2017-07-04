// @flow

import { createObjectsReducer, InitialObjectStoreState } from 'reducers/objects'
import type { ObjectStoreState } from 'reducers/objects'
import type { LoanMap } from 'types/liabilities/loan'
import type { ObjectAction } from 'actions/objects'

export type LoanState = ObjectStoreState & { +objects: LoanMap }

export const InitialLoanState: LoanState = InitialObjectStoreState

const LoanReducer: (LoanState, ObjectAction) => LoanState =
  createObjectsReducer('LOAN', 'LOANS')

export default LoanReducer
