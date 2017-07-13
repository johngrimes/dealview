import { realEstateToAsset } from './realEstate.js'
import { validRealEstate2 } from './fixtures/realEstate'
import { saleFilter } from './valuations.js'

describe('realEstateToAsset', () => {
  it('should convert a real estate asset with a sale correctly', () => {
    const realEstate = { ...validRealEstate2 }
    expect(realEstateToAsset(realEstate)).toMatchSnapshot()
  })

  it('should omit the sale price in the asset valuations', () => {
    const realEstate = { ...validRealEstate2 }
    const asset = realEstateToAsset(realEstate)
    expect(asset.valuations.filter(saleFilter)).toHaveLength(0)
  })
})
