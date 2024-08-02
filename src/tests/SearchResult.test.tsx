import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import SearchResult from '../components/SearchResult/SearchResult';
import { RootState } from '../store';
import { toggleItem } from '../features/selectedItemsSlice';
import { Character } from '../api/apiSlice';

const mockStore = configureStore<Partial<RootState>>();

const mockResults: Character[] = [
  {
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
  },
  {
    url: 'http://swapi.dev/api/people/2/',
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    homeworld: 'http://swapi.dev/api/planets/1/',
    films: ['http://swapi.dev/api/films/1/'],
    species: ['http://swapi.dev/api/species/2/'],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:10:51.357000Z',
    edited: '2014-12-20T21:17:50.309000Z',
  },
];

describe('SearchResult Component', () => {
  let store: MockStoreEnhanced<Partial<RootState>, object>;
  let mockDispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = mockStore({
      selectedItems: {
        items: {},
        itemDetails: {},
      },
    });
    mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
  });

  it('renders loading state correctly', () => {
    render(
      <Provider store={store}>
        <SearchResult
          results={[]}
          isLoading={true}
          error={undefined}
          onItemClick={() => {}}
        />
      </Provider>,
    );
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });

  it('renders no results message when there are no results', () => {
    render(
      <Provider store={store}>
        <SearchResult
          results={[]}
          isLoading={false}
          error={undefined}
          onItemClick={() => {}}
        />
      </Provider>,
    );
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders search results correctly', () => {
    render(
      <Provider store={store}>
        <SearchResult
          results={mockResults}
          isLoading={false}
          error={undefined}
          onItemClick={() => {}}
        />
      </Provider>,
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('C-3PO')).toBeInTheDocument();
    expect(screen.getByText('Year of birth: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Year of birth: 112BBY')).toBeInTheDocument();
  });

  it('handles item click correctly', () => {
    const handleClick = vi.fn();
    render(
      <Provider store={store}>
        <SearchResult
          results={mockResults}
          isLoading={false}
          error={undefined}
          onItemClick={handleClick}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(handleClick).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByText('C-3PO'));
    expect(handleClick).toHaveBeenCalledWith('2');
  });

  it('handles item selection correctly', () => {
    render(
      <Provider store={store}>
        <SearchResult
          results={mockResults}
          isLoading={false}
          error={undefined}
          onItemClick={() => {}}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('checkbox', { name: /Luke Skywalker/i }));
    expect(mockDispatch).toHaveBeenCalledWith(
      toggleItem({
        url: 'http://swapi.dev/api/people/1/',
        item: mockResults[0],
      }),
    );

    fireEvent.click(screen.getByRole('checkbox', { name: /C-3PO/i }));
    expect(mockDispatch).toHaveBeenCalledWith(
      toggleItem({
        url: 'http://swapi.dev/api/people/2/',
        item: mockResults[1],
      }),
    );
  });
});
