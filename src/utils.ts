import { Ads, ChosenAds } from './types/Ad'
import { Companies, PromotionType } from './types/Company'

export const calculateTotal = (
  chosenAds: ChosenAds,
  currentCompanyId: string,
  ads: Ads,
  companies: Companies
): string => {
  let total = 0
  //loop through all the chosen ads to calculate the price
  Object.keys(chosenAds).forEach((adId) => {
    const promotion = companies.byIds[currentCompanyId].promotions.find(
      (p) => p.adId === adId
    )
    const adCount = chosenAds[adId]
    const normalPrice = ads.byIds[adId].price

    if (promotion && adCount) {
      switch (promotion.type) {
        case PromotionType.DISCOUNT:
          total = total + promotion.price * adCount
          break
        case PromotionType.XFORY:
          const times = Math.floor(adCount / promotion.x)
          const rest = adCount % promotion.x
          total = total + (promotion.y * times + rest) * normalPrice
          break
        default:
          break
      }
    } else {
      total = total + adCount * normalPrice
    }
  })

  return total.toFixed(2)
}
