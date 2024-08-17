import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types';

interface FormState {
  controlledFormData: FormData | null;
  uncontrolledFormData: FormData | null;
}

const initialState: FormState = {
  controlledFormData: null,
  uncontrolledFormData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm(
      state,
      action: PayloadAction<{
        formType: 'controlled' | 'uncontrolled';
        data: FormData;
      }>,
    ) {
      if (action.payload.formType === 'controlled') {
        state.controlledFormData = action.payload.data;
      } else {
        state.uncontrolledFormData = action.payload.data;
      }
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;
