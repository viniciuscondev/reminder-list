import React, { useState, useEffect } from 'react';

export default function NewTask() {
  const [task, setTask] = useState('');

  async function handleTask() {
    // event.preventDefault();

    await fetch('/api/newtask', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task),
    });
  }

  useEffect(() => {}, []);

  return (

    <form onSubmit={handleTask}>
      <label htmlFor="newtask">
        Adicionar tarefa:
        {' '}
        <input type="text" id="newtask" name="newtask" placeholder="Nova tarefa" onChange={(event) => setTask(event.target.value)} />
      </label>
      <button type="submit">Adicionar</button>
    </form>

  );
}
