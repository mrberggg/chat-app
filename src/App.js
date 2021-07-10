import { Container, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import './App.scss';
import { Chat } from './features/chat/Chat';
import { EnterName } from './features/name/Name';
import { selectName } from './features/name/userSlice';
import './App.scss';

function App() {
  const name = useSelector(selectName);
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
