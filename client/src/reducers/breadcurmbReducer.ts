import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = ['Dashboard', 'Customers'];

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    updateBreadcrumb: (state, action: PayloadAction<string>) => {
      if(state.length > 1) {
        state.pop();
      }
      state.push(action.payload);
    },
  }
});

export const { updateBreadcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;