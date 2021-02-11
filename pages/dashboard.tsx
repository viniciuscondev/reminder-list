import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header from '../src/components/Header';
import NewTask from '../src/components/NewTask';
import Task from '../src/components/Task';
import Loading from '../src/components/Loading';

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  async function isAuth() {
    if (await !session) { router.push('/'); }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <Header />
      {session ? (
        <>
          <h1>
            Olá,
            {' '}
            {session.user.name}
          </h1>
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
