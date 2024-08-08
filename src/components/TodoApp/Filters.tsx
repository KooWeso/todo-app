import useTodo from '../../hook/useTodo'
import './css/filters.css'

function Filters() {
  const { dispatch, action } = useTodo()

  const handleFilterChange = (filter: 'All' | 'Active' | 'Completed') => () => {
    dispatch({ type: action.CHANGE.FILTER, payload: { filter } })
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
