import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type Character = {
  id: string;
  name: string;
  description: string;
};

type GetCharactersResponse = {
  results: Character[];
  count: number;
  next: string | null;
  previous: string | null;
};

type QueryArgGetCharacters = { searchTerm: string; page: number };

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
  error: FetchBaseQueryError | undefined;
  isLoading: boolean;
};
export const useGetCharacterDetailsQuery = apiSlice.endpoints
  .getCharacterDetails.useQuery as (arg: string) => {
  data: Character | undefined;
  error: FetchBaseQueryError | undefined;
  isLoading: boolean;
};
