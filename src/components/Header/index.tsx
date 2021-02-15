import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, .3));
  padding: 15px;
  color: ${({ theme }) => theme.colors.primary};
    
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
  }

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    margin-left: 20px;
    border: none;
    padding: 5px 20px;
    font-size: 16px;    
    border-radius: 5px;
    cursor: pointer;
    transition: .5s;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    //color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Header() {
  const [session] = useSession();

  return (
    <NavBar>
      <Link href="/"><a href="/">Reminder List</a></Link>
      <div>
        {!session && (
        <>
          <span>Entre e começe a usar!</span>
          <button type="button" onClick={() => signIn('auth0')}>Entrar</button>
        </>
        )}
        {session && (
        <>
          Signed in as
          {' '}
          {session.user.email}
          {' '}
          <Link href="/dashboard"><button type="button">Dashboard</button></Link>
          <button type="button" onClick={() => signOut({ callbackUrl: '/' })}>Sair</button>
        </>
        )}
      </div>
    </NavBar>
  );
}
