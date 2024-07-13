export type Character = {
  name: string;
  birth_year: string;
  url: string;
};

export type ApiResponse = {
  results: Character[];
  count: number;
};

export interface State {
  results?: { name: string; description: string; id: string }[];
  isLoading: boolean;
  totalPages?: number;
}
