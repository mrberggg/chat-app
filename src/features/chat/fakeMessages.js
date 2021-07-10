import { v4 as uuidv4 } from 'uuid';
import { lorem, name as fakerName } from 'faker';

const generateFakeUser = () => ({
  id: uuidv4(),
  name: fakerName.findName(),
});

const generateFakeNumber = (max, min = 0) => {
  const num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

const fakeUsers = [generateFakeUser(), generateFakeUser(), generateFakeUser()];

function generateFakeMessage() {
  // Get a random user from our list
  const { id, name } = fakeUsers[generateFakeNumber(fakeUsers.length)];
  const message = lorem.sentence();
  return {
    id,
    name,
    message,
  };
}

export function generateFakeChat(cb) {
  setTimeout(() => {
    const message = generateFakeMessage();
    cb(message);
  }, generateFakeNumber(7, 3) * 1000); // 3-7 seconds
}
