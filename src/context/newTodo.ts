export type TodoItemType = {
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

export const newTodo = (title: string, id: string, time?: number) => {
  const todo: TodoItemType = {
    title,
    id,
    checked: false,
    timestamp: new Date(),
  }

  if (time) {
    todo.timer = {
      init: time,
      current: time,
      active: false,
      interval: 0,
    }
  }

  return todo
}
