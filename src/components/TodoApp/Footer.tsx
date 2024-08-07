import React from 'react'

import Filters from './Filters'
import './css/footer.css'

type FooterProps = {
  setFilter: (filterType: 'All' | 'Active' | 'Completed') => void
  deleteComplited: () => void
  todoCount: number
  todoInactive: number
}

function Footer({ setFilter, deleteComplited, todoCount, todoInactive }: FooterProps) {
  let light: string = 'stop'

  if (todoInactive === 0) light = 'stop'
  else light = todoCount ? 'wait' : 'clear'

  return (
    <footer className="footer">
      <span className="footer__todo-count" title={todoCount ? `${todoCount} left` : 'lazy'}>
        {todoCount ? `${todoCount} items left` : 'Add some tasks'}
      </span>
      <Filters setFilter={setFilter} />
      <button type="button" className="footer__clear-completed" onClick={() => deleteComplited()}>
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
