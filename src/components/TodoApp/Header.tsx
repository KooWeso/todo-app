import NewTaskForm from './NewTaskForm'
import './css/header.css'

type HeaderProps = { addNewTodo: (title: string, timer?: number) => void }
function Header({ addNewTodo }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title" title="twerk">
        todos
      </h1>
      <NewTaskForm addNewTodo={addNewTodo} />
    </header>
  )
}

export default Header
