/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

import Modal from '../Modal';

const TaskBox = styled.div`
  border: 1px solid #bebebe;
  border-radius: 6px;
  padding: 5px;
  margin-top: 5px;
  width: 70vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input {
    margin-left: 10px;
  }
    
  span {
    margin-left: 20px;
  }

  @media only screen and (max-width: 880px) {
    width: 90vw;
  }  
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  box-shadow:inset 0px 1px 0px 0px #f5978e;
  background:linear-gradient(to bottom, #f24537 5%, #c62d1f 100%);
  background-color:#f24537;
  border-radius:6px;
  border:1px solid #d02718;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;  
  font-size:15px;
  font-weight:bold;
  padding:6px 12px;
  text-decoration:none;
  text-shadow:0px 1px 0px #810e05;

  :hover {
    background:linear-gradient(to bottom, #c62d1f 5%, #f24537 100%);
    background-color:#c62d1f;
  }
  :active {
    position:relative;
    top:1px;
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
              <DeleteButton type="button" onClick={() => DeleteTask(task)}><FiTrash2 /></DeleteButton>
            </div>
          </TaskBox>
        ))
      )}

    </div>
  );
}
