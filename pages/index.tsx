import React from 'react';

import Header from '../src/components/Header';
import Background from '../src/components/Background';

export default function Home() {
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
