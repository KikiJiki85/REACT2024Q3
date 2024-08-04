import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

type GetCharactersResponse = {
  results: Character[];
  count: number;
  next: string | null;
  previous: string | null;
};

type QueryArgGetCharacters = { searchTerm: string | null; page: number };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: builder => ({
    getCharacters: builder.query<GetCharactersResponse, QueryArgGetCharacters>({
      query: ({ searchTerm = '', page = 1 }) =>
        `people/?search=${searchTerm}&page=${page}`,
    }),
    getCharacterDetails: builder.query<Character, string>({
      query: id => `people/${id}/`,
    }),
  }),
});

export const useGetCharactersQuery = apiSlice.endpoints.getCharacters
  .useQuery as (arg: QueryArgGetCharacters) => {
  data: GetCharactersResponse | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | undefined;
};

export const useGetCharacterDetailsQuery = apiSlice.endpoints
  .getCharacterDetails.useQuery as (arg: string) => {
  data: Character | undefined;
  isLoading: boolean;
};
