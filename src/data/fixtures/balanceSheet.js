import type { BalanceSheetOverTime } from 'types/balanceSheet'

export const validBalanceSheet1: BalanceSheetOverTime = {
  '2017-01-01': {
    totalAssets: 1000070,
    totalLiabilities: 845000,
    equity: 155070,
  },
  '2017-01-02': {
    totalAssets: 1000080,
    totalLiabilities: 835000,
    equity: 165080,
  },
}

export const validBalanceSheet2: BalanceSheetOverTime = {
  '2017-01-01': {
    totalAssets: 1000070,
    totalLiabilities: 845000,
    equity: 155070,
  },
  '2017-01-02': {
    totalAssets: 1000080,
    totalLiabilities: 835000,
    equity: 165080,
  },
  '2017-01-03': {
    totalAssets: 1000080,
    totalLiabilities: 835000,
    equity: 165080,
  },
}
