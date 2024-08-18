import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const initialCountries: string[] = [];

export const store = configureStore({
  reducer: {
    forms: formReducer,
    countries: () => initialCountries,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
