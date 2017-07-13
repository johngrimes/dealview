import moment from 'moment'

import { balanceSheetOverTime } from './balanceSheet.js'
import { DateStorageFormat } from './commonTypes.js'

onmessage = event => {
  // This is required, as some scripts (like react-devtools) will broadcast
  // messages to all workers.
  if (event.data[0] === 'updateBalanceSheetRequest') {
    console.log(`Balance sheet calc started:`, event.data)
    postMessage(
      balanceSheetOverTime(
        event.data[1],
        event.data[2],
        moment(event.data[3], DateStorageFormat),
        moment(event.data[4], DateStorageFormat)
      )
    )
  }
}
