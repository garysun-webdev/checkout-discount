import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

jest.mock('./data', () => ({
  ads: {
    byIds: {
      ad1: {
        id: 'ad1',
        name: 'Classic Ad',
        description: 'Offers the most basic level of advertisement',
        price: 1
      },
      ad2: {
        id: 'ad2',
        name: 'Stand out Ad',
        description:
          'Allows advertisers to use a company logo and use a longer presentation text',
        price: 2
      },
      ad3: {
        id: 'ad3',
        name: 'Premium Ad',
        description:
          'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
        price: 3
      }
    },
    allIds: ['ad1', 'ad2', 'ad3']
  },
  companies: {
    byIds: {
      company1: {
        id: 'company1',
        name: 'SecondBite',
        promotions: [
          {
            type: 'xfory',
            x: 3,
            y: 2,
            adId: 'ad1'
          }
        ]
      }
    },
    allIds: ['company1']
  }
}))

describe('App', () => {
  it('renders UI elements', () => {
    render(<App />)
    userEvent.click(screen.getByTestId('ad1-add-button'))
    userEvent.click(screen.getByTestId('ad1-add-button'))
    userEvent.click(screen.getByTestId('ad1-add-button'))
    userEvent.click(screen.getByTestId('ad2-add-button'))
    userEvent.click(screen.getByTestId('ad3-add-button'))
    userEvent.click(screen.getByTestId('checkout-button'))
    const totalPrice = screen.getByText('total price: 7.00')
    expect(totalPrice).toBeInTheDocument()
  })
})
