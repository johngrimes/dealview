import { AssetMap } from '../data/assets/asset.js'
import { LiabilityMap } from '../data/liabilities/liability.js'

export type BalanceSheet = {
  totalAssets: number,
  totalLiabilities: number,
  equity: number
}
export type BalanceSheetOverTime = { [date: string]: BalanceSheet }

export balanceSheetOverTime(assets: AssetMap, liabilities: LiabilityMap): BalanceSheetOverTime {

}
