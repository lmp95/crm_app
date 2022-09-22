import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import breadcrumbReducer from '../reducers/breadcurmbReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    breadcrumb: breadcrumbReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;