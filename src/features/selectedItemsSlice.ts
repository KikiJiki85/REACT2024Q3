import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
  [key: string]: boolean;
}

const initialState: SelectedItemsState = {};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state[itemId] = !state[itemId];
    },
  },
});

export const { toggleItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
