enum AdName {
  CLASS_AD = 'Class Ad',
  STAND_OUT_AD = 'Stand out Ad',
  PREMIUM_AD = 'Premium Ad'
}

export type Ad = {
  id: string
  name: AdName
  description: string
  price: number
}

export type Ads = {
  byIds: {
    [key: string]: Ad
  }
  allIds: string[]
}

export type ChosenAds = {
  [key: string]: number
}
