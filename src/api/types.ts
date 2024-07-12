export type Character = {
  name: string;
  birth_year: string;
  url: string;
};

export type ApiResponse = {
  results: Character[];
  count: number;
};
