import React from 'libs/react';
import Todo from './Todo';

function App() {
  const data = {
    id: '123',
    name: 'boba',
    complite: false
  }
  const onRemove = (id: string) => {
    console.log('remove ', id);
  }
  const onToggle = (id: string) => {
    console.log('toggle ', id);
  }


  return (
    <div className="App">
      <h1>Remote App</h1>
      <Todo data={data} onRemove={onRemove} onToggleComplete={onToggle}></Todo>
    </div>
  );
}

export default App;
