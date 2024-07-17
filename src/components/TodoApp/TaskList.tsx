import React, { ReactElement } from 'react'

import Task from './Task'
import './css/taskList.css'

interface TodoListProps<T> {
  items: T[]
  handlers: {
    handleDelete: (id: string) => void
    handleCheck: (id: string) => void
    startTimer: (id: string) => void
    stopTimer: (id: string) => void
    setTimer: (id: string, type: string, value: unknown) => void
  }
  filter: 'All' | 'Active' | 'Completed'
}

type TodoItemType = {
  title: string
  id: string
  checked: boolean
  timestamp: Date
  timer?: {
    init: number
    current: number
    active: boolean
    interval: number
  }
}

function TaskList({ items, handlers, filter = 'All' }: TodoListProps<TodoItemType>): ReactElement {
  return (
    <ul className={`todo-list ${filter !== 'All' && filter}`}>
      {items.map((item) => {
        return <Task item={item} key={item.id} handlers={handlers} />
      })}
    </ul>
  )
}

export default TaskList
