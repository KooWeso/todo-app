import { Component } from 'react'
import './css/task.css'
import { formatDistanceToNow } from 'date-fns'

interface TaskProps {
  item: {
    title: string
    timestamp: Date
    id: string
    checked: boolean
    timer?: {
      init: number
      current: number
      active: boolean
      interval: number
    }
  }
  handlers: {
    handleDelete: (id: string) => void
    handleCheck: (id: string) => void
  }
}

class Task extends Component<TaskProps, { countdown: string }> {
  constructor(props: TaskProps) {
    super(props)

    this.state = {
      countdown: 'A moment ago',
    }
  }

  render() {
    const {
      item: { title, timestamp, id, checked },
      handlers: { handleCheck, handleDelete },
    }: TaskProps = this.props

    const { countdown } = this.state

    setInterval(() => {
      const formated: string | null = formatDistanceToNow(timestamp, {
        addSuffix: true,
        includeSeconds: true,
      })

      if (formated !== countdown) {
        this.setState({
          countdown: formated,
        })
      }
    }, 9000)

    return (
      <li className="task">
        <button
          type="button"
          className="task__view custom-checkbox"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleCheck(id)
          }}
        >
          <svg
            className={`task__custom-checkbox${checked ? ' task__custom-checkbox--checked' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z" />
          </svg>

          <span className="task__label" style={{ cursor: 'pointer', userSelect: 'none' }}>
            <span className="task__label-description" title={title}>
              {title}
            </span>
            <span className="task__label-created">{countdown}</span>
          </span>
        </button>
        <button aria-label="Edit" type="button" className="task__btn task__edit" title="Edit task">
          <svg className="icon task__edit-icon" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
            <path d="M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z" />
          </svg>
        </button>
        <button
          aria-label="Destroy"
          type="button"
          title="Destroy task"
          className="task__btn task__destroy"
          onClick={() => handleDelete(id)}
        >
          <svg
            className="task__icon task__destroy-icon"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
            <path d="M12 8.75H4v-1.5h8v1.5z" />
          </svg>
        </button>
      </li>
    )
  }
}

export default Task
