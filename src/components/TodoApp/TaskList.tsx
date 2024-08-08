import { ReactElement } from 'react'

import useTodo from '../../hook/useTodo'

import Task from './Task'
import './css/taskList.css'
import TaskTimer from './TaskTimer'

function TaskList(): ReactElement {
  const { filter, filteredItems } = useTodo()

  return (
    <ul className={`todo-list ${filter !== 'All' && filter}`}>
      {filteredItems.map((item) => {
        return (
          <Task item={item} key={item.id}>
            {item.timer && <TaskTimer timer={item.timer} id={item.id} />}
          </Task>
        )
      })}
    </ul>
  )
}

export default TaskList
