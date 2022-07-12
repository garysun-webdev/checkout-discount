import { calculateTotal } from './utils'
import { ads as adsData } from './data'
import { Companies, PromotionType } from './types/Company'
import { Ads } from './types/Ad'

describe('calculateTotal', () => {
  let companies = {} as Companies
  let ads = {} as Ads

  beforeEach(() => {
    companies = {
      byIds: {
        company1: {
          id: 'company1',
          name: 'company1',
          promotions: []
        }
      },
      allIds: []
    }

    ads = adsData
  })

  it('can calaulate discount promotion', () => {
    const chosenAds = {
      ad1: 1
    }
    const currentCompanyId = 'company1'
    companies.byIds.company1.promotions = [
      {
        type: PromotionType.DISCOUNT,
        adId: 'ad1',
        price: 1
      }
    ]

    const total = calculateTotal(chosenAds, currentCompanyId, ads, companies)
    expect(total).toBe('1.00')
  })

  it('can calaulate xfory promotion', () => {
    const chosenAds = {
      ad1: 5
    }
    const currentCompanyId = 'company1'
    companies.byIds.company1.promotions = [
      {
        type: PromotionType.XFORY,
        x: 3,
        y: 1,
        adId: 'ad1'
      }
    ]
    ads.byIds.ad1.price = 1

    const total = calculateTotal(chosenAds, currentCompanyId, ads, companies)
    expect(total).toBe('3.00')
  })

  it('uses regular price to calculate when no promotion', () => {
    const chosenAds = {
      ad1: 4,
      ad2: 2
    }
    const currentCompanyId = 'company1'
    companies.byIds.company1.promotions = []
    ads.byIds.ad1.price = 1
    ads.byIds.ad2.price = 2

    const total = calculateTotal(chosenAds, currentCompanyId, ads, companies)
    expect(total).toBe('8.00')
  })

  it('returns 0.00 when no chosenAds', () => {
    const chosenAds = {}
    const currentCompanyId = 'company1'

    const total = calculateTotal(chosenAds, currentCompanyId, ads, companies)
    expect(total).toBe('0.00')
  })

  it('uses the first promotion if one company has two promotions towards the same ad', () => {
    const chosenAds = { ad1: 3 }
    const currentCompanyId = 'company1'

    companies.byIds.company1.promotions = [
      {
        type: PromotionType.XFORY,
        x: 3,
        y: 1,
        adId: 'ad1'
      },
      {
        type: PromotionType.DISCOUNT,
        adId: 'ad1',
        price: 1
      }
    ]
    //the calculateTotal
    ads.byIds.ad1.price = 10
    const total = calculateTotal(chosenAds, currentCompanyId, ads, companies)
    expect(total).not.toBe('1.00')
  })
})
