import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';

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
  padding: 30px 80px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 10px;

  input {
    width: 100%;
    border-radius:6px;
    border:1px solid #777777;
    display:inline-block;    
    font-family:Arial;
    font-size:16px;    
    padding:10px 12px;
    margin-bottom: 24px;    

  }

  button {
  box-shadow:inset 0px 1px 0px 0px #54a3f7;
  background:linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
  background-color:#007dc1;
  border-radius:3px;
  border:1px solid #124d77;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:15px;
  padding:6px 24px;
  text-decoration:none;
  text-shadow:0px 1px 0px #154682;
}

button:hover {
  background:linear-gradient(to bottom, #0061a7 5%, #007dc1 100%);
  background-color:#0061a7;
}
button:active {
  position:relative;
  top:1px;
}
`;

const EditButton = styled.button`
  box-shadow:inset 0px 1px 0px 0px #f9eca0;
  background:linear-gradient(to bottom, #f0c911 5%, #f2ab1e 100%);
  background-color:#f0c911;
  border-radius:6px;
  border:1px solid #e65f44;
  display:inline-block;
  cursor:pointer;
  color:#c92200;
  font-family:Arial;
  font-size:15px;
  font-weight:bold;
  padding:6px 12px;
  text-decoration:none;
  text-shadow:0px 1px 0px #ded17c;

  :hover {
    background:linear-gradient(to bottom, #f2ab1e 5%, #f0c911 100%);
    background-color:#f2ab1e;
}
:active {
    position:relative;
    top:1px;
}
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
      <EditButton type="button" onClick={openModal}><FiEdit /></EditButton>
    </>
  );
}
