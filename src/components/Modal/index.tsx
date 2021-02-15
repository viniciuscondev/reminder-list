import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

interface Props {
    task: string;
    index: number;
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  padding: 30px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 10px;
`;

export default function Modal({ task, index }: Props) {
  const [updatedTask, setUpdatedTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const stringIndex = index.toString();
  const router = useRouter();

  async function handleUpdate(event) {
    const data = { updatedTask, index };

    event.preventDefault();

    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.reload();
  }

  const modalRef = useRef();

  function openModal() {
    setShowModal((prev) => !prev);
  }

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateY(0%)' : 'translateY(-100%)',
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal],
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress],
  );

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>

              <input type="text" id={stringIndex} name={stringIndex} defaultValue={task} onChange={(event) => setUpdatedTask(event.target.value)} />
              <button type="button" onClick={handleUpdate}>Salvar alterações</button>

            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
      <button type="button" onClick={openModal}>Editar</button>
    </>
  );
}
