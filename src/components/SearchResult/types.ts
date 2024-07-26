import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface SearchResultProps {
  results: Array<{
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
  }>;
  error: FetchBaseQueryError | undefined;
  isLoading: boolean;
  onItemClick: (id: string) => void;
}
