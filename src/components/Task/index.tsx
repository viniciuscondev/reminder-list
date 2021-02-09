/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';

const TaskBox = styled.div`
  border: 1px solid #bebebe;
  padding: 5px;
  margin-top: 5px;
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
    
  span {
    margin-left: 20px;
  }
  button {
    margin-left: 10px;
  }
`;

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [session] = useSession();

  async function getTasks() {
    const response = await fetch('/api/tasks', {
      method: 'GET',
      headers: { userEmail: session.user.email },
    });

    const parseResponse = await response.json();

    setTasks(parseResponse.task);
  }

  async function DeleteTask(task) {
    await fetch('/api/tasks', {
      method: 'DELETE',
      body: task,
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      {tasks.map((task, index) => (

        <TaskBox key={index}>
          <div>
            <input type="checkbox" />
            <span>{task}</span>
          </div>
          <div>
            <button type="button">Editar</button>
            <button type="button" onClick={() => DeleteTask(task)}>Deletar</button>
          </div>
        </TaskBox>
      ))}
    </div>
  );
}
