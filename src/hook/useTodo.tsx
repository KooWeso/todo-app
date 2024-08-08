import { useContext } from 'react'

import { TodoContext, UseTodoContextType } from '../context/TodoProvider'

const useTodo = (): UseTodoContextType => useContext(TodoContext)

export default useTodo
