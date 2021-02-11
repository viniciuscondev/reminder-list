import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { getSession } from 'next-auth/client';
import Header from '../src/components/Header';
import Background from '../src/components/Background';

export default function Home() {
  const router = useRouter();

  async function isAuth() {
    const session = await getSession();

    if (session) { router.push('/dashboard'); }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <Header />
      <Background>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <Background.color />
      </Background>
    </>
  );
}
