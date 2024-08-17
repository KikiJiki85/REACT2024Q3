import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types.ts';

interface FormState {
  [key: string]: FormData;
}

const initialState: FormState = {};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    updateForm: (
      state,
      action: PayloadAction<{ formType: string; data: FormData }>,
    ) => {
      state[action.payload.formType] = action.payload.data;
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;
