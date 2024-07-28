import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer, {
  toggleItem,
  unselectAllItems,
} from '../features/selectedItemsSlice';
import { Character } from '../api/apiSlice';

const character: Character = {
  url: 'http://swapi.dev/api/people/1/',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'http://swapi.dev/api/planets/1/',
  films: ['http://swapi.dev/api/films/1/'],
  species: [],
  vehicles: ['http://swapi.dev/api/vehicles/14/'],
  starships: ['http://swapi.dev/api/starships/12/'],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
};

describe('selectedItemsSlice', () => {
  const initialState = {
    items: {},
    itemDetails: {},
  };

  it('should handle initial state', () => {
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should toggle item selection', () => {
    const store = configureStore({ reducer: selectedItemsReducer });

    store.dispatch(
      toggleItem({ url: 'http://example.com/character/1', item: character }),
    );
    let state = store.getState();
    expect(state.items).toEqual({ 'http://example.com/character/1': true });
    expect(state.itemDetails).toEqual({
      'http://example.com/character/1': character,
    });

    store.dispatch(
      toggleItem({ url: 'http://example.com/character/1', item: character }),
    );
    state = store.getState();
    expect(state.items).toEqual({});
    expect(state.itemDetails).toEqual({});
  });

  it('should unselect all items', () => {
    const store = configureStore({ reducer: selectedItemsReducer });

    store.dispatch(
      toggleItem({ url: 'http://example.com/character/1', item: character }),
    );
    let state = store.getState();
    expect(state.items).toEqual({ 'http://example.com/character/1': true });
    expect(state.itemDetails).toEqual({
      'http://example.com/character/1': character,
    });

    store.dispatch(unselectAllItems());
    state = store.getState();
    expect(state.items).toEqual({});
    expect(state.itemDetails).toEqual({});
  });
});
