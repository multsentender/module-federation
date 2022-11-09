import React from 'react';
import { FormEvent } from 'react';
import { v4 as uuid } from 'uuid';

import Todo, { ITodo } from '../@mf-typescript/remote/undefined'
const TodoItem = React.lazy(() => import('remote/Todo')) as unknown as typeof Todo


function App() {
  const [todos, setTodos] = React.useState<ITodo[]>([])

  const createTodo = (name: string) => {
    if(name.trim().length > 0) {
      setTodos(prev => [...prev, { id: uuid(), complite: false, name }])
    }
  }

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(el => el.id !== id))
  }

  const setCompleteTodo = (id: string) => {
    setTodos(prev => prev.map(el => el.id === id ? {...el, complite: !el.complite} : el))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement)
    const formDataValue = Object.fromEntries(formData);

    createTodo(formDataValue.name.toString())
    formElement.reset()
  }

  return (
    <div className="app">
      <h1>Module federation (React-typescript)</h1>
      <form onSubmit={submit}>
        <label>Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="todos">
        <React.Suspense fallback='load todos'>
          {
            todos.map(el => (
              <TodoItem
                key={el.id}
                data={el}
                onToggleComplete={setCompleteTodo}
                onRemove={removeTodo}></TodoItem>
            ))
          }
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
