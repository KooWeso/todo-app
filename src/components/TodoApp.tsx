import React, { Component, ReactNode } from 'react'

import Header from './TodoApp/Header'
import TaskList from './TodoApp/TaskList'
import Footer from './TodoApp/Footer'
import './TodoApp/css/index.css'

type TodoItemType = {
  title: string
  id: string
  checked: boolean
  timestamp: Date
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

  render(): ReactNode {
    const { todoItems, filter } = this.state as TodoItems

    const newTodo = (title: string) => {
      const id: string = todoItems.length ? `t-${Number(todoItems[todoItems.length - 1].id.slice(2)) + 1}` : 't-1'

      return {
        title,
        id,
        checked: false,
        timestamp: new Date(),
      }
    }

    const addNewTodo = (title: string) => {
      const newTodoItem = newTodo(title)

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
        todoItems: todoItems.filter((item: TodoItemType) => !item.checked),
      })
    }
    const setFilter = (filterType: TodoItems['filter']) => {
      this.setState({
        filter: filterType,
      })
    }

    const handlers = {
      handleDelete,
      handleCheck,
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
