import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from 'socket.io-client';
import { addChat, initializeChats, selectMessages } from './chatSlice';
import { generateFakeChat } from './fakeMessages';
import './Chat.scss';
import { NewMessage } from './NewMessage';
import { Messages } from './Messages';

const CHANNEL = 'code-test';

export function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const [connection, setConnection] = useState();

  function emitMessage(message) {
    // Ignore if no text entered
    if (!message) return;
    // Emit message to channel
    connection.emit('message', message, CHANNEL);
    // Generate a fake response for demo
    emitFakeMessage();
  }

  // For demo purposes, generate a fake response to sent messages
  function emitFakeMessage() {
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
    <div className="chat">
      <div className="messages">
        <Messages messages={messages} />
      </div>
      <div className="new-message">
        <NewMessage sendMessage={(message) => emitMessage(message)} />
      </div>
    </div>
  );
}
