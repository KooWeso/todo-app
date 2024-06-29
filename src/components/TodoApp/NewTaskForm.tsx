import React, { Component, RefObject, createRef } from 'react'
import './css/newTaskForm.css'

type FormProps = { addNewTodo: (title: string) => void }
type FormState = { title: string }

class NewTaskForm extends Component<FormProps, FormState> {
  inputRef: RefObject<HTMLInputElement>

  constructor(props: FormProps) {
    super(props)

    this.state = {
      title: '',
    }

    this.inputRef = createRef<HTMLInputElement>()
  }

  render() {
    const { title } = this.state
    const { addNewTodo }: FormProps = this.props

    const setTitle = (c: string) => {
      this.setState({
        title: c,
      })
    }

    return (
      <form
        className="new-todo-form"
        id="newTodo"
        onSubmit={(e) => {
          e.preventDefault()
          addNewTodo(title)
          setTitle('')
          this.inputRef.current!.focus()
        }}
      >
        <input
          ref={this.inputRef}
          form="newTodo"
          className="new-todo-form__input"
          type="text"
          placeholder="What needs to be done?"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      </form>
    )
  }
}

export default NewTaskForm
