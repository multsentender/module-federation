import React from 'react'
import './style.css'

export type ITodo = {
  id: string
  name: string,
  complite: boolean
}

type TodoProp = {
  data: ITodo,
  onToggleComplete: (id: string) => void,
  onRemove: (id: string) => void
}

const Todo = ({
  data: {id, name, complite},
  onToggleComplete,
  onRemove}: TodoProp) => {
  return (
    <div className="todo">
      <b className="todo__name">{name}</b>
      <div className="todo__btns">
        <input type="checkbox" name="complete" checked={complite} onChange={() => onToggleComplete(id)} />
        <button onClick={() => onRemove(id)}>❌</button>
      </div>
    </div>
  )
}

export default Todo
