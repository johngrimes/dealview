// @flow

export type BalanceSheet = {
  totalAssets: number,
  totalLiabilities: number,
  equity: number
}
export type BalanceSheetOverTime = { [date: string]: BalanceSheet }
