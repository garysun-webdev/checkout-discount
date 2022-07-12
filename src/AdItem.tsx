import React from 'react'
import { ads } from './data'

type AdItemProps = {
  adId: string
  handleAddAnAd: (id: string) => void
  handleDeleteAnAd: (id: string) => void
  count?: number
}

const AdItem: React.FC<AdItemProps> = ({
  adId,
  count = 0,
  handleAddAnAd,
  handleDeleteAnAd
}) => {
  const adDetails = ads.byIds[adId]
  return (
    <li>
      <div>Name: {adDetails.name}</div>
      <div>Description: {adDetails.description}</div>
      <div>Price: {adDetails.price}</div>
      <div>Count: {count}</div>
      <button
        onClick={() => handleAddAnAd(adId)}
        data-testid={`${adId}-add-button`}
      >
        Add
      </button>
      <button
        onClick={() => handleDeleteAnAd(adId)}
        disabled={!count}
        data-testid={`${adId}-del-button`}
      >
        Delete
      </button>
    </li>
  )
}

export default AdItem
