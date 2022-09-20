import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  username: string | null,
  role: string | null,
  isLoggedIn: boolean,
  token: string | null,
}

// Define the initial state using that type
const initialState: UserState = {
    username: null,
    role: null,
    isLoggedIn: false,
    token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assignUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    unassignUser: (state) => {
      state.username = null;
      state.role = null;
      state.isLoggedIn = false;
      state.token = null;
    }
  }
});

export const { assignUser, unassignUser } = userSlice.actions;

export default userSlice.reducer;