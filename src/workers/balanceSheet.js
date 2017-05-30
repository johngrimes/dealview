// @flow

import { balanceSheetOverTime } from 'types/balanceSheet'

onmessage = event => {
  console.log(`Balance sheet calc started:`, event.data)
  // flow-ignore
  postMessage(balanceSheetOverTime(...event.data))
}
