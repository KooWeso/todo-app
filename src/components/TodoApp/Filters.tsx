import { MouseEventHandler } from 'react'
import './css/filters.css'

type FilterProps = {
  setFilter: (filterType: 'All' | 'Active' | 'Completed') => void
}

function Filters({ setFilter }: FilterProps) {
  const handleFilterChange = (type: 'All' | 'Active' | 'Completed'): MouseEventHandler<HTMLButtonElement> => {
    return () => setFilter(type)
  }

  return (
    <ul className="filters">
      <li>
        <button type="button" className="filters__btn" onClick={handleFilterChange('All')}>
          All
        </button>
      </li>
      <li>
        <button type="button" className="filters__btn" onClick={handleFilterChange('Active')}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className="filters__btn" onClick={handleFilterChange('Completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default Filters
