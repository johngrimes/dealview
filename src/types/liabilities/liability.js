// @flow

export type Liability = {
  type: 'ResidentialHomeLoan',
  instanceId: string,
  name: string,
  startDate: string,
  endDate: string
}

export type LiabilityWithId = Liability & { id: string }

export type LiabilityMap = { [id: string]: LiabilityWithId }
