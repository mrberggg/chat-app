import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'chats';
const TTL = 60 * 60 * 1000; // 1 hour in ms

const initialState = {
  loading: false,
  error: null,
  chats: [],
};

export const initializeChats = createAsyncThunk('chat/initialize', async () => {
  const chatsString = localStorage.getItem(STORAGE_KEY);
  const chatsObj = JSON.parse(chatsString);
  const expiredTime = Date.now() - TTL;
  if (chatsObj.ttl < expiredTime) {
    return [];
  }
  return chatsObj.chats;
});

export const addChat = createAsyncThunk(
  'chat/add',
  async (newChat, thunkAPI) => {
    const { chat } = thunkAPI.getState();
    const chatWithId = { ...newChat, id: uuidv4() };
    const chats = [...chat.chats, chatWithId];
    const chatsString = JSON.stringify({
      chats,
      ttl: Date.now() + TTL,
    });
    localStorage.setItem(STORAGE_KEY, chatsString);
    return chats;
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(initializeChats.fulfilled, (state, action) => {
        state.chats = state.chats.concat(action.payload);
      })
      .addCase(addChat.fulfilled, (state, action) => {
        state.chats = action.payload;
      });
  },
});

export const selectChatLoading = (state) => state.chat.loading;
export const selectMessages = (state) => state.chat.chats;

export default chatSlice.reducer;
