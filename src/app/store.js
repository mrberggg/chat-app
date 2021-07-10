import { configureStore } from '@reduxjs/toolkit';
import nameReducer from '../features/name/userSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: nameReducer,
  },
});
