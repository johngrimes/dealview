// @flow

import moment from 'moment'

import { balanceSheetOverTime } from 'types/balanceSheet'
import { DateStorageFormat } from 'types/commonTypes'

onmessage = event => {
  console.log(`Balance sheet calc started:`, event.data)
  // flow-ignore
  postMessage(balanceSheetOverTime(
    event.data[0],
    event.data[1],
    moment(event.data[2], DateStorageFormat),
    moment(event.data[3], DateStorageFormat),
  ))
}
