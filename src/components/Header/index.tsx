import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #59c951;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, .3));
  padding: 15px;
  color: ${({ theme }) => theme.colors.primary};
    
  a {
    color: white;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
  }
`;

export default function Header() {
  const [session] = useSession();

  return (
    <NavBar>
      <Link href="/"><a href="/">To Do App</a></Link>
      <div>
        {!session && (
        <>
          Not signed in
          {' '}
          <br />
          <button type="button" onClick={() => signIn('auth0')}>Entrar</button>
        </>
        )}
        {session && (
        <>
          Signed in as
          {' '}
          {session.user.email}
          {' '}
          <br />
          <Link href="/dashboard"><button type="button">Dashboard</button></Link>
          <button type="button" onClick={() => signOut()}>Sair</button>
        </>
        )}
      </div>
    </NavBar>
  );
}
