import { createContext, ReactElement, useMemo, useReducer } from 'react'

import { newTodo, TodoItemType } from './newTodo'

type TodoItems = {
  todoItems: TodoItemType[]
  filter: 'All' | 'Active' | 'Completed'
}

interface PayloadType {
  title?: string
  id?: string
  filter?: TodoItems['filter']
  time?: number
  interval?: number
}
type ReducerAction = {
  type: string
  payload: PayloadType
}

const reducerActions = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  REMOVE_CHECKED: 'REMOVE_CHECKED',
  CHANGE: {
    TITLE: 'TITLE',
    CHECK: 'CHECK',
    FILTER: 'FILTER',
  },
  TIMER_CHANGE: 'TIMER_CHANGE',
  TIMER_STOP: 'TIMER_STOP',
  TIMER_INTERVAL: 'TIMER_INTERVAL',
}
export type ReducerActionsType = typeof reducerActions

const todoReducer = (state: TodoItems, action: ReducerAction): TodoItems => {
  switch (action.type) {
    case reducerActions.ADD: {
      if (!action.payload.title) throw new Error('type "ADD" should have "title" as a payload')

      const { title, time } = action.payload
      const id = state.todoItems.length ? String(state.todoItems[state.todoItems.length - 1].id + 1) : '1'
      const newTodoItem = newTodo(title, id, time)

      return { ...state, todoItems: [...state.todoItems, newTodoItem] }
    }
    case reducerActions.REMOVE: {
      if (!action.payload.id) throw new Error('type "REMOVE" should have "id" as a payload')

      const { id } = action.payload
      const updatedItems = state.todoItems.filter((t) => t.id !== id)

      return { ...state, todoItems: updatedItems }
    }
    case reducerActions.CHANGE.TITLE: {
      if (!action.payload.id) throw new Error('type "CHANGE.TITLE" should have "id" as a payload')
      if (!action.payload.title) throw new Error('type "CHANGE.TITLE" should have "title" as a payload')

      const { id, title } = action.payload
      const updatedItems = state.todoItems.map((t) => (t.id === id ? { ...t, title } : t))

      return { ...state, todoItems: updatedItems }
    }
    case reducerActions.CHANGE.CHECK: {
      if (!action.payload.id) throw new Error('type "CHANGE.CHECK" should have "id" as a payload')

      const { id } = action.payload
      const updatedItems = state.todoItems.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))

      return { ...state, todoItems: updatedItems }
    }
    case reducerActions.CHANGE.FILTER: {
      if (!action.payload.filter) throw new Error('type "CHANGE.FILTER" should have "filter" as a payload')

      const { filter } = action.payload

      return { ...state, filter }
    }
    case reducerActions.REMOVE_CHECKED: {
      return { ...state, todoItems: state.todoItems.filter((t) => !t.checked) }
    }
    case reducerActions.TIMER_CHANGE: {
      if (!action.payload.id) throw new Error('type "TIMER_CHANGE" should have "id" as a payload')
      if (!action.payload.time) throw new Error('type "TIMER_CHANGE" should have "time" as a payload')

      const { id, time } = action.payload
      const updatedItems = state.todoItems.map((t) =>
        t.id === id && t.timer ? { ...t, timer: { ...t.timer, current: t.timer.current + time } } : t
      )

      return { ...state, todoItems: updatedItems }
    }
    case reducerActions.TIMER_STOP: {
      if (!action.payload.id) throw new Error('type "TIMER_STOP" should have "id" as a payload')

      const { id } = action.payload
      const updatedItems = state.todoItems.map((t) => {
        if (t.id === id && t.timer) {
          clearInterval(t.timer.interval)
          return { ...t, timer: { ...t.timer, active: false } }
        }
        return t
      })

      return { ...state, todoItems: updatedItems }
    }
    case reducerActions.TIMER_INTERVAL: {
      if (!action.payload.id) throw new Error('type "TIMER_INTERVAL" should have "id" as a payload')
      if (!action.payload.interval) throw new Error('type "TIMER_INTERVAL" should have "interval" as a payload')

      const { id, interval } = action.payload
      const updatedItems = state.todoItems.map((t) => {
        if (t.id === id && t.timer) {
          return { ...t, timer: { ...t.timer, active: true, interval } }
        }
        return t
      })

      return { ...state, todoItems: updatedItems }
    }

    default:
      throw new Error(`Unexpected action.type: ${action.type}.\n Valid types: ${Object.keys(reducerActions).join()}`)
  }
}

const initState: TodoItems = {
  todoItems: [],
  filter: 'All',
}

const useTodoContext = (initTodoState: TodoItems) => {
  const [state, dispatch] = useReducer(todoReducer, initTodoState)

  const action = useMemo(() => {
    return reducerActions
  }, [])

  const startTimer = (id: string) => {
    const interval = setInterval(() => {
      dispatch({ type: action.TIMER_CHANGE, payload: { id, time: -1 } })
    }, 1000)
    dispatch({ type: action.TIMER_INTERVAL, payload: { id, interval } })
  }

  const getFilteredItems = (filter?: 'All' | 'Active' | 'Completed'): TodoItemType[] => {
    switch (filter || state.filter) {
      case 'All':
        return state.todoItems
      case 'Active':
        return state.todoItems.filter((item) => !item.checked)
      case 'Completed':
        return state.todoItems.filter((item) => item.checked)
      default:
        return []
    }
  }

  const filteredItems = getFilteredItems()

  const notDoneItemsLength: number = getFilteredItems('Active').length
  const allItemsLength: number = getFilteredItems('All').length

  return {
    action,
    dispatch,
    filter: state.filter,
    startTimer,
    filteredItems,
    notDoneItemsLength,
    allItemsLength,
  }
}

export type UseTodoContextType = ReturnType<typeof useTodoContext>

const initTodoContextState: UseTodoContextType = {
  action: reducerActions,
  dispatch: () => {},
  startTimer: () => {},
  filteredItems: [],
  notDoneItemsLength: 0,
  allItemsLength: 0,
  filter: 'All',
}

export const TodoContext = createContext<UseTodoContextType>(initTodoContextState)

type ChildrenType = { children: ReactElement | ReactElement[] | undefined }
function TodoProvider({ children }: ChildrenType): ReactElement {
  return <TodoContext.Provider value={useTodoContext(initState)}>{children}</TodoContext.Provider>
}

export default TodoProvider
