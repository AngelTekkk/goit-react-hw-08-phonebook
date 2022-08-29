import { configureStore } from '@reduxjs/toolkit';
import { contactApi } from './contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactApi.middleware,
  ],
});
