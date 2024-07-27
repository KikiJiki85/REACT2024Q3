import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: {} as { [key: string]: boolean },
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      state[action.payload] = !state[action.payload];
    },
    unselectAllItems(state) {
      Object.keys(state).forEach(key => {
        state[key] = false;
      });
    },
  },
});

export const { toggleItem, unselectAllItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
