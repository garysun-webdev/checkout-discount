import React from 'react'
import { render, screen } from '@testing-library/react'
import AdItem from './AdItem'
import userEvent from '@testing-library/user-event'

jest.mock('./data', () => ({
  ads: {
    byIds: {
      ad1: {
        id: 'ad1',
        name: 'Classic Ad',
        description: 'Offers the most basic level of advertisement',
        price: 269.99
      }
    },
    allIds: ['ad1']
  }
}))

describe('AdItem', () => {
  it('renders UI elements', () => {
    const handleAddAnAd = jest.fn()
    const handleDeleteAnAd = jest.fn()
    render(
      <AdItem
        adId="ad1"
        handleAddAnAd={handleAddAnAd}
        handleDeleteAnAd={handleDeleteAnAd}
      />
    )

    expect(screen.getByText('Name: Classic Ad')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Description: Offers the most basic level of advertisement'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Price: 269.99')).toBeInTheDocument()
    expect(screen.getByText('Count: 0')).toBeInTheDocument()

    const addButton = screen.getByTestId('ad1-add-button')
    const delButton = screen.getByTestId('ad1-del-button')

    userEvent.click(addButton)
    expect(handleAddAnAd).toHaveBeenCalled()
    expect(delButton).toHaveAttribute('disabled')
  })

  it('enables delete button when count is above 0', () => {
    const handleAddAnAd = jest.fn()
    const handleDeleteAnAd = jest.fn()
    render(
      <AdItem
        adId="ad1"
        handleAddAnAd={handleAddAnAd}
        handleDeleteAnAd={handleDeleteAnAd}
        count={1}
      />
    )

    expect(screen.getByText('Count: 1')).toBeInTheDocument()

    const delButton = screen.getByTestId('ad1-del-button')

    expect(delButton).not.toHaveAttribute('disabled')
    userEvent.click(delButton)
    expect(handleDeleteAnAd).toHaveBeenCalled()
  })
})
