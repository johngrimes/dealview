/* global expect */

import expectGen from 'expect-gen'

import watchRealEstate from 'db/sagas/realEstate'
import { putRealEstateRequest } from 'actions/realEstate'
import { validRealEstate1 } from 'fixtures/realEstate'

describe('putRealEstate', () => {
  it('should dispatch correct actions when successful', () => {
    const effects = expectGen(watchRealEstate)
      .yields(putRealEstateRequest(validRealEstate1))
      .finishes()
      .toJSON()
    expect(effects).toMatchSnapshot()
  })
})
