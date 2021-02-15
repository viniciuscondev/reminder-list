import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NewTask() {
  const [task, setTask] = useState('');
  const router = useRouter();

  async function handleTask(event) {
    event.preventDefault();

    await fetch('/api/newtask', {
      method: 'POST',
      body: task,
    });

    router.reload();
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
