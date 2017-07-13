import { createObjectsReducer, InitialObjectStoreState } from './objects.js'

export const InitialLoanState = InitialObjectStoreState

const LoanReducer = createObjectsReducer('LOAN', 'LOANS')

export default LoanReducer
