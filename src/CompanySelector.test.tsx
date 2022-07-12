import React from 'react'
import { render, screen } from '@testing-library/react'
import CompanySelector from './CompanySelector'
import userEvent from '@testing-library/user-event'

jest.mock('./data', () => ({
  companies: {
    byIds: {
      company1: {
        id: 'company1',
        name: 'SecondBite',
        promotions: []
      },
      company2: {
        id: 'company2',
        name: 'Axil Coffee Roasters',
        promotions: []
      }
    },
    allIds: ['company1', 'company2']
  }
}))

describe('CompanySelector', () => {
  it('renders UI elements based on companies', () => {
    const handleCompanyChange = jest.fn()
    render(
      <CompanySelector
        currentCompanyId="company1"
        handleCompanyChange={handleCompanyChange}
      />
    )
    expect(screen.getByText('Which company are you:')).toBeInTheDocument()
    expect(screen.getByText('SecondBite')).toBeInTheDocument()
    expect(screen.getByText('Axil Coffee Roasters')).toBeInTheDocument()
    expect(screen.queryByText('MYER')).not.toBeInTheDocument()
  })

  it('triggers handleCompanyChange when select companies', () => {
    const handleCompanyChange = jest.fn()
    render(
      <CompanySelector
        currentCompanyId="company1"
        handleCompanyChange={handleCompanyChange}
      />
    )
    const selector = screen.getByTestId('company-select')
    userEvent.selectOptions(selector, 'company2')
    expect(handleCompanyChange).toHaveBeenCalledWith('company2')
  })
})
