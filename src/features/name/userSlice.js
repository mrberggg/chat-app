import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const USER_NAME_KEY = 'user-name';
const USER_ID_KEY = 'user-id';

const initialState = {
  id: '',
  name: '',
};

export const getUserId = createAsyncThunk('user/getId', async () => {
  let uuid = localStorage.getItem(USER_ID_KEY);
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem(USER_ID_KEY);
  }
  return uuid;
});

export const getName = createAsyncThunk('user/getName', async () => {
  const name = localStorage.getItem(USER_NAME_KEY) || '';
  return name;
});

export const setName = createAsyncThunk('user/setName', async (name) => {
  localStorage.setItem(USER_NAME_KEY, name);
  return name;
});

export const userSlice = createSlice({
  name: 'name',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserId.fulfilled, (state, action) => {
        state.id = action.payload;
      })
      .addCase(getName.fulfilled, (state, action) => {
        state.name = action.payload;
      })
      .addCase(setName.fulfilled, (state, action) => {
        state.name = action.payload;
      });
  },
});

export const selectName = (state) => state.user.name;
export const selectId = (state) => state.user.id;

export default userSlice.reducer;
