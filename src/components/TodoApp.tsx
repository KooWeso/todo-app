import TodoProvider from '../context/TodoProvider'

import Header from './TodoApp/Header'
import TaskList from './TodoApp/TaskList'
import Footer from './TodoApp/Footer'
import './TodoApp/css/index.css'

function TodoApp() {
  return (
    <TodoProvider>
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </TodoProvider>
  )
}

export default TodoApp
