import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectUserId } from '../name/userSlice';
import './Messages.scss';

function getInitial(name) {
  return name.slice(0, 1);
}

export function Messages({ messages }) {
  const userId = useSelector(selectUserId);

  function isOwnMessage(messageUserId) {
    return messageUserId === userId;
  }

  return (
    <div className="messages">
      {messages.map(({ id, name, message, userId }) => (
        <Paper
          key={id}
          className={classNames('message', {
            isOwnMessage: isOwnMessage(userId),
          })}
        >
          <Grid container wrap="nowrap" spacing={2} className="content">
            <Grid item className="avatar">
              <Avatar>{getInitial(name)}</Avatar>
            </Grid>
            <Grid item className="message">
              <Typography>{message}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}
