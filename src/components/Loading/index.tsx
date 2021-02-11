/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(20px);
    }
    100% {
        transform: translateY(0px);
    }
`;

const DotsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20vh;
`;

const Dot = styled.div`
  background-color: #2c2c2c;
  margin: 0 5px 0 5px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  animation: ${animate} .5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

export default function Loading() {
  return (
    <DotsContainer>
      <Dot delay="0s" />
      <Dot delay=".1s" />
      <Dot delay=".2s" />
    </DotsContainer>
  );
}
