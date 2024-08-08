import { useCallback, useEffect } from 'react'

import useTodo from '../../hook/useTodo'

type TaskTimerProps = {
  timer: {
    init: number
    current: number
    active: boolean
  }
  id: string
}

function TaskTimer({ timer: { current: time, init, active }, id }: TaskTimerProps) {
  const { dispatch, action, startTimer } = useTodo()

  const handleClick = useCallback(() => {
    if (time <= 0) {
      dispatch({ type: action.TIMER_CHANGE, payload: { id, time: init } })
    }
    if (active && time > 0) {
      dispatch({ type: action.TIMER_STOP, payload: { id } })
    } else if (time > 0) {
      startTimer(id)
    }
  }, [action.TIMER_CHANGE, action.TIMER_STOP, active, dispatch, id, init, startTimer, time])

  const buttonImgPick = useCallback(() => {
    if (time === 0) {
      return (
        <svg
          style={{
            fill: 'var(--essential-bright-accent)',
          }}
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="task__icon"
        >
          <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z" />
        </svg>
      )
    }
    return active ? (
      <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="task__icon">
        <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" />
      </svg>
    ) : (
      <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="task__icon">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
      </svg>
    )
  }, [active, time])

  const renderTime = useCallback((): string => {
    if (time / 60 >= 60) {
      return `${Math.floor(time / 3600)}h ${Math.floor(time / 60) % 60}m ${time % 60}s`
    }
    if (time < 60) {
      return `${time}s`
    }
    return `${Math.floor(time / 60)}m ${time % 60}s`
  }, [time])

  useEffect(() => {
    if (time <= 0) {
      dispatch({ type: action.TIMER_STOP, payload: { id } })
    }
  }, [action.TIMER_STOP, dispatch, id, time])

  return (
    <button type="button" onClick={handleClick} className="task__btn task__btn--timer">
      {buttonImgPick()}
      <span className="timer">{renderTime()}</span>
    </button>
  )
}

export default TaskTimer
