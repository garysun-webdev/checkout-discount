import React from 'react'
import { companies } from './data'

type CompanySelectorProps = {
  currentCompanyId: string
  handleCompanyChange: (id: string) => void
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  currentCompanyId,
  handleCompanyChange
}) => {
  return (
    <div>
      <label htmlFor="company">Which company are you:</label>

      <select
        name="company"
        id="company"
        value={currentCompanyId}
        onChange={(e) => handleCompanyChange(e.target.value)}
        data-testid="company-select"
      >
        {companies.allIds.map((id) => (
          <option value={companies.byIds[id].id} key={companies.byIds[id].id}>
            {companies.byIds[id].name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CompanySelector
