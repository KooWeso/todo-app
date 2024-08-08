import NewTaskForm from './NewTaskForm'
import './css/header.css'

function Header() {
  return (
    <header className="header">
      <h1 className="header__title" title="twerk">
        todos
      </h1>
      <NewTaskForm />
    </header>
  )
}

export default Header
