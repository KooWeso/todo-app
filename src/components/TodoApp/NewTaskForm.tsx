import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import './css/newTaskForm.css'
import useTodo from '../../hook/useTodo'

function NewTaskForm() {
  const [title, setTitle] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { dispatch, action } = useTodo()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (minutes || seconds)
      dispatch({ type: action.ADD, payload: { title, time: Number(minutes) * 60 + Number(seconds) } })
    else dispatch({ type: action.ADD, payload: { title } })

    setTitle('')
    setMinutes('')
    setSeconds('')
    inputRef.current?.focus()
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.value.replace(/\D/g, ''))
  }

  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeconds(e.target.value.replace(/\D/g, ''))
  }

  const content = (
    <form className="new-todo-form" id="newTodo" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        form="newTodo"
        className="new-todo-form__input"
        type="text"
        placeholder="What needs to be done?"
        required
        value={title}
        onChange={handleTitleChange}
      />
      <button aria-label="Add" type="submit" form="newTodo" className="new-todo-form__submit" title="Add new task">
        <svg
          className="new-todo-form__submit-icon"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
          <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z" />
        </svg>
      </button>
      <input
        form="newTodo"
        className="new-todo-form__input new-todo-form__input--timer"
        type="text"
        placeholder="Minutes"
        value={minutes}
        onInput={handleMinutesChange}
      />
      <input
        form="newTodo"
        className="new-todo-form__input new-todo-form__input--timer"
        type="text"
        placeholder="Seconds"
        value={seconds}
        onInput={handleSecondsChange}
      />
    </form>
  )

  return content
}

export default NewTaskForm
