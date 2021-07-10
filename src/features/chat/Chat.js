import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from 'socket.io-client';
import { selectId, selectName } from '../name/userSlice';
import { addChat, initializeChats, selectChats } from './chatSlice';
import { generateFakeChat } from './fakeMessages';
import './Chat.scss';

const CHANNEL = 'code-test';

export function Chat() {
  const dispatch = useDispatch();
  const chatBoxRef = useRef();
  const [chatBox, setChatBox] = useState();
  const name = useSelector(selectName);
  const id = useSelector(selectId);
  const chats = useSelector(selectChats);
  const [connection, setConnection] = useState();

  function emitChat(message) {
    // Ignore if no text entered
    if (!message) return;
    // Emit message to channel
    connection.emit(
      'message',
      {
        message,
        name,
        id,
      },
      CHANNEL
    );
    // Reset input
    chatBoxRef.current.value = '';
    // Generate a fake response for demo
    emitFakeChat();
  }

  // For demo purposes, generate a fake response to sent messages
  function emitFakeChat() {
    generateFakeChat((message) => connection.emit('message', message, CHANNEL));
  }

  useEffect(() => {
    dispatch(initializeChats());
  }, [dispatch]);

  useEffect(() => {
    const c = socket.connect('wss://codechallenge.brand.live');
    setConnection(c);
  }, []);

  useEffect(() => {
    if (!connection) return;
    connection.on('connect', () => {
      connection.emit('join-channel', CHANNEL);
    });
    connection.on('error', (e) => {
      console.error(e);
    });
    connection.on('message', (message) => {
      // Put chat into redux
      dispatch(addChat(message));
    });
  }, [connection, dispatch]);

  return (
    <div>
      <div>
        <input
          onChange={(e) => setChatBox(e.target.value)}
          placeholder="Enter Chat"
          ref={chatBoxRef}
        />
        <button onClick={() => emitChat(chatBox)}>Submit</button>
        <ul>
          {chats.map((c, i) => (
            <li key={i}>
              {c.message} by {c.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
