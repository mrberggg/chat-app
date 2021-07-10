import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import './App.scss';
import { Chat } from './features/chat/Chat';
import { EnterName } from './features/name/Name';
import { selectName } from './features/name/userSlice';

function App() {
  const name = useSelector(selectName);
  return (
    <Container>
      <header>Chat</header>
      <main>
        {!name ? (
          <EnterName />
        ) : (
          <div>
            Hello {name}
            <Chat />
          </div>
        )}
      </main>
    </Container>
  );
}

export default App;
