import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';

// Define a type for the slice state
interface UserState {
  email: string | null,
  role: string | null,
  token: string | null,
}

// Define the initial state using that type
const initialState: UserState = {
  email: localStorage.getItem('email'),
  role: localStorage.getItem('role'),
  token: getCookie('token'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assignUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    unassignUser: (state) => {
      state.email = null;
      state.role = null;
      state.token = null;
    }
  }
});

export const { assignUser, unassignUser } = userSlice.actions;

export default userSlice.reducer;