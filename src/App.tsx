import React, { useState } from 'react'
import AdItem from './AdItem'
import CompanySelector from './CompanySelector'
import { ads, companies } from './data'
import { ChosenAds } from './types/Ad'
import { calculateTotal } from './utils'

const App = () => {
  const [currentCompanyId, setCurrentCompanyId] = useState<string>(
    companies.allIds[0]
  )

  const [chosenAds, setChosenAds] = useState<ChosenAds>({})
  const [totalPrice, setTotalPrice] = useState<string>('0.00')
  const handleCompanyChange = (companyId: string) => {
    setCurrentCompanyId(companyId)
    setChosenAds({})
  }

  const handleAddAnAd = (adId: string) =>
    setChosenAds((ads) => ({ ...ads, [adId]: (ads[adId] ? ads[adId] : 0) + 1 }))

  const handleDeleteAnAd = (adId: string) =>
    setChosenAds((ads) => ({ ...ads, [adId]: (ads[adId] ? ads[adId] : 0) - 1 }))

  const handleCheckout = () =>
    setTotalPrice(calculateTotal(chosenAds, currentCompanyId, ads, companies))

  return (
    <>
      <CompanySelector
        currentCompanyId={currentCompanyId}
        handleCompanyChange={handleCompanyChange}
      />
      <ul>
        {ads.allIds.map((id) => (
          <AdItem
            key={id}
            adId={id}
            count={chosenAds[id]}
            handleAddAnAd={handleAddAnAd}
            handleDeleteAnAd={handleDeleteAnAd}
          />
        ))}
      </ul>
      <button onClick={handleCheckout} data-testid="checkout-button">
        Checkout
      </button>
      <div>total price: {totalPrice}</div>
    </>
  )
}

export default App
