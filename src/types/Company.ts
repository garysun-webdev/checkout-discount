type Company = {
  id: string
  name: string
  promotions: Promotion[]
}

export type Companies = {
  byIds: {
    [key: string]: Company
  }
  allIds: string[]
}

type Promotion = XforY | Discount

export enum PromotionType {
  XFORY = 'xfory',
  DISCOUNT = 'discount'
}

type XforY = {
  type: PromotionType.XFORY
  x: number
  y: number
  adId: string
}

type Discount = {
  type: PromotionType.DISCOUNT
  price: number
  adId: string
}
