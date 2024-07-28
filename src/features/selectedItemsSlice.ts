import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../api/apiSlice';
interface SelectedItemsState {
  items: { [key: string]: boolean };
  itemDetails: { [key: string]: Character };
}

const initialState: SelectedItemsState = {
  items: {},
  itemDetails: {},
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<{ url: string; item: Character }>) {
      const { url, item } = action.payload;
      if (state.items[url]) {
        delete state.items[url];
        delete state.itemDetails[url];
      } else {
        state.items[url] = true;
        state.itemDetails[url] = item;
      }
    },
    unselectAllItems(state) {
      state.items = {};
      state.itemDetails = {};
    },
  },
});

export const { toggleItem, unselectAllItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
