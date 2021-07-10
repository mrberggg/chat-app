import { IconButton, InputBase, Paper } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId, selectName } from '../name/userSlice';
import './NewMessage.scss';

export function NewMessage({ sendMessage }) {
  const messageRef = useRef();
  const [message, setMessage] = useState();
  const name = useSelector(selectName);
  const userId = useSelector(selectUserId);

  function emitChat(event) {
    // Prevent form submission
    event.preventDefault();
    // Ignore if no text entered
    if (!message) return;
    sendMessage({
      name,
      message,
      userId,
    });
    // Reset input
    messageRef.current.value = '';
  }

  return (
    <Paper component="form" className="new-message" onSubmit={emitChat}>
      <InputBase
        className="message-input"
        placeholder="Enter Chat"
        onChange={(e) => setMessage(e.target.value)}
        inputRef={messageRef}
      />
      <IconButton type="submit" className="submit-button" aria-label="send">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
