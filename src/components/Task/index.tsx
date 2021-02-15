/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Modal from '../Modal';

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
  const router = useRouter();

  async function getTasks() {
    const response = await fetch('/api/tasks', {
      method: 'GET',
      headers: { userEmail: session.user.email },
    });

    const parseResponse = await response.json();

    if (parseResponse.task) {
      setTasks(parseResponse.task);
    } else {
      setTasks(null);
    }
  }

  async function DeleteTask(task) {
    await fetch('/api/tasks', {
      method: 'DELETE',
      body: task,
    });

    router.reload();
  }

  // async function UpdateTask(task) {
  //   await fetch('/api/tasks', {
  //     method: 'PUT',
  //     body: task,
  //   });
  // }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      {tasks === null ? (<h1>Não há tarefas cadastradas</h1>) : (
        tasks.map((task, index) => (

          <TaskBox key={index}>
            <div>
              <input type="checkbox" />
              <span>{task}</span>
            </div>
            <div>
              <Modal task={task} index={index} />
              <button type="button" onClick={() => DeleteTask(task)}>Deletar</button>
            </div>
          </TaskBox>
        ))
      )}

    </div>
  );
}
