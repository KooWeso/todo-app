import useTodo from '../../hook/useTodo'

import Filters from './Filters'
import './css/footer.css'

function Footer() {
  const { dispatch, action, allItemsLength, notDoneItemsLength } = useTodo()

  let light: string = 'stop'
  if (notDoneItemsLength) light = 'wait'
  if (!notDoneItemsLength && allItemsLength) light = 'clear'

  const handleClick = () => {
    dispatch({ type: action.REMOVE_CHECKED, payload: {} })
  }

  return (
    <footer className="footer">
      <span className="footer__todo-count" title={notDoneItemsLength ? `${notDoneItemsLength} left` : 'lazy'}>
        {notDoneItemsLength ? `${notDoneItemsLength} items left` : 'Add some tasks'}
      </span>
      <Filters />
      <button type="button" className="footer__clear-completed" onClick={handleClick}>
        <span className="footer__clear-completed-text">Clear completed</span>
        <svg
          className={`footer__clear-completed-icon ${light}`}
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
          <path d="M11.005 4.995a.75.75 0 0 1 0 1.06L9.061 8l1.944 1.945a.75.75 0 1 1-1.06 1.06L8 9.061l-1.945 1.944a.75.75 0 1 1-1.06-1.06L6.939 8 4.995 6.055a.75.75 0 1 1 1.06-1.06L8 6.939l1.945-1.944a.75.75 0 0 1 1.06 0z" />
        </svg>
      </button>
    </footer>
  )
}

export default Footer
