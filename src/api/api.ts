import { ApiResponse, Character } from './types';

const API = 'https://swapi.dev/api/people';

const getDataFromAPI = (
  query: string,
  page: number,
  setState: (state: {
    isLoading: boolean;
    results?: { name: string; description: string }[];
  }) => void,
) => {
  setState({ isLoading: true });
  fetch(`${API}?search=${query}&page=${page}`)
    .then(response => response.json())
    .then((data: ApiResponse) => {
      const results = data.results.map((character: Character) => ({
        name: character.name,
        description: character.birth_year,
      }));
      setState({ results, isLoading: false });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setState({ isLoading: false });
    });
};

const fetchResults = (
  searchTerm: string,
  setState: (state: {
    isLoading: boolean;
    results?: { name: string; description: string }[];
  }) => void,
  page: number = 1,
) => {
  const trimmedSearchTerm = searchTerm.trim();

  if (trimmedSearchTerm) {
    getDataFromAPI(trimmedSearchTerm, page, setState);
  } else {
    getDataFromAPI('', page, setState);
  }
};

export { fetchResults };
