import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Form = styled.form`
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;

  label {
    display: flex;
    flex-direction: row;
    align-content: center;
    width: 100%;    
  }

  input {
    width: 100%;
    border-radius:6px;
    border:1px solid #777777;
    display:inline-block;    
    font-family:Arial;
    font-size:16px;    
    padding:10px 12px;        
  }

  button {
    box-shadow:inset 0px 1px 0px 0px #caefab;
    background:linear-gradient(to bottom, #77d42a 5%, #5cb811 100%);
    background-color:#77d42a;
    border-radius:6px;
    border:1px solid #268a16;
    display:inline-block;
    cursor:pointer;
    color:#306108;    
    font-size:16px;
    font-weight:bold;
    padding:6px 24px;
    text-decoration:none;
    text-shadow:0px 1px 0px #aade7c;
    margin-left: 20px;
  }

  button:hover {
  background:linear-gradient(to bottom, #5cb811 5%, #77d42a 100%);
  background-color:#5cb811;
  }
  button:active {
    position:relative;
    top:1px;
  }

  @media only screen and (max-width: 880px) {
    width: 90vw;
  } 
`;

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

  return (

    <Form onSubmit={handleTask}>
      <label htmlFor="newtask">
        <input type="text" id="newtask" name="newtask" placeholder="Nova tarefa" onChange={(event) => setTask(event.target.value)} />
      </label>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="submit">Adicionar</button>
    </Form>

  );
}
