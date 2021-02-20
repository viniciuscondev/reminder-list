import React from 'react';
import { useSession } from 'next-auth/client';
// import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header from '../src/components/Header';
import NewTask from '../src/components/NewTask';
import Task from '../src/components/Task';
import Loading from '../src/components/Loading';

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Header />
      {session ? (
        <>
          <TaskContainer>
            <NewTask />
            {loading ? (<Loading />) : (<Task />)}
          </TaskContainer>
        </>
      ) : (
        <h1>Você não tem permissão para acessar está página, por favor, faça o login</h1>
      )}
    </>
  );
}
