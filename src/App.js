import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { Chat } from './features/chat/Chat';
import { EnterName } from './features/name/Name';
import { getUserId, selectName } from './features/name/userSlice';
import './App.scss';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  useEffect(() => {
    dispatch(getUserId());
  }, [dispatch]);
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="app">
          <h1 className="header">Chat</h1>
          <main className="main">{name ? <Chat /> : <EnterName />}</main>
        </div>
      </Container>
    </div>
  );
}

export default App;
