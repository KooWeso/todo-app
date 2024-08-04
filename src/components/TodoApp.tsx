import { Component, ReactNode } from 'react'

import Header from './TodoApp/Header'
import TaskList from './TodoApp/TaskList'
import Footer from './TodoApp/Footer'
import './TodoApp/css/index.css'

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
type TodoItems = {
  todoItems: TodoItemType[]
  filter: 'All' | 'Active' | 'Completed'
}

class TodoApp extends Component {
  constructor(props: object) {
    super(props)

    this.state = {
      todoItems: [],
      filter: 'All',
    }
  }

  getTimer = (id: string) => {
    const { todoItems } = this.state as TodoItems
    const [foundItem] = todoItems.filter((item: TodoItemType) => item.id === id)
    return foundItem.timer
  }

  render(): ReactNode {
    const { todoItems, filter } = this.state as TodoItems

    const newTodo = (title: string, timer?: number) => {
      const id: string = todoItems.length ? `t-${Number(todoItems[todoItems.length - 1].id.slice(2)) + 1}` : 't-1'

      const todo: TodoItemType = {
        title,
        id,
        checked: false,
        timestamp: new Date(),
      }

      if (timer) {
        todo.timer = {
          init: timer,
          current: timer,
          active: false,
          interval: 0,
        }
      }

      return todo
    }

    const addNewTodo = (title: string, timer?: number) => {
      const newTodoItem = newTodo(title, timer)

      this.setState({
        todoItems: [...todoItems, newTodoItem],
      })
    }

    const handleCheck = (id: string) => {
      this.setState({
        todoItems: todoItems.map((item: TodoItemType) => (item.id === id ? { ...item, checked: !item.checked } : item)),
      })
    }

    const handleDelete = (id: string) => {
      this.setState({
        todoItems: todoItems.filter((item: TodoItemType) => item.id !== id),
      })
    }

    const deleteComplited = () => {
      this.setState({
        todoItems: todoItems.filter((item: TodoItemType) => {
          if (item.checked && item.timer?.active) {
            clearInterval(this.getTimer(item.id)!.interval)
          }
          return !item.checked
        }),
      })
    }
    const setFilter = (filterType: TodoItems['filter']) => {
      this.setState({
        filter: filterType,
      })
    }

    const setTimer = (id: string, type: string, value: unknown) => {
      this.setState((prev: TodoItems) => ({
        todoItems: prev.todoItems.map((item: TodoItemType) =>
          item.id === id ? { ...item, timer: { ...item.timer, [type]: value } } : item
        ),
      }))
    }

    const stopTimer = (id: string) => {
      if (id) {
        clearInterval(this.getTimer(id)!.interval)
        setTimer(id, 'active', false)
      }
    }

    const reduceTimer = (id: string) => {
      if (this.getTimer(id)!.current < 1) {
        stopTimer(id)
      } else {
        this.setState((prev: TodoItems) => ({
          todoItems: prev.todoItems.map((item: TodoItemType) =>
            item.id === id ? { ...item, timer: { ...item.timer, current: Number(item.timer!.current) - 1 } } : item
          ),
        }))
      }
    }
    const startTimer = (id: string) => {
      if (id) {
        if (this.getTimer(id)!.active === false) {
          const intervalId: number = setInterval(() => {
            reduceTimer(id)
          }, 1000)

          setTimer(id, 'interval', intervalId)
          setTimer(id, 'active', true)
        }
      }
    }

    const handlers = {
      handleDelete,
      handleCheck,
      startTimer,
      stopTimer,
      setTimer,
    }

    let filteredItems: TodoItemType[] = []

    if (filter === 'All') {
      filteredItems = todoItems
    } else if (filter === 'Active') {
      filteredItems = todoItems.filter((item) => !item.checked)
    } else if (filter === 'Completed') {
      filteredItems = todoItems.filter((item) => item.checked)
    } else {
      filteredItems = []
    }

    return (
      <section className="todoapp">
        <Header addNewTodo={addNewTodo} />
        <section className="main">
          <TaskList items={filteredItems} handlers={handlers} filter={filter} />
          <Footer
            todoInactive={todoItems.filter((item) => item.checked).length}
            setFilter={setFilter}
            deleteComplited={deleteComplited}
            todoCount={todoItems.filter((item) => !item.checked).length}
          />
        </section>
      </section>
    )
  }
}

export default TodoApp
