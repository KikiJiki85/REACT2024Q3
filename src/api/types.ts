export interface Character {
  name: string;
  birth_year: string;
  url: string;
}

export interface ApiResponse {
  results: Character[];
  count: number;
}

export interface State {
  results?: { name: string; description: string; id: string }[];
  isLoading: boolean;
  totalPages?: number;
}

export interface CharacterDetails {
  name: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  skin_color: string;
}
