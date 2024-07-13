import { ApiResponse, Character } from './types';

const API = 'https://swapi.dev/api/people';

const getDataFromAPI = (
  query: string,
  page: number,
  setState: (state: {
    isLoading: boolean;
    results?: { name: string; description: string }[];
    totalPages?: number;
  }) => void,
) => {
  setState({ isLoading: true });
  fetch(`${API}?search=${query}&page=${page}`)
    .then(response => response.json())
    .then((data: ApiResponse) => {
      const results = data.results.map((character: Character) => ({
        name: character.name,
        description: character.birth_year,
        id: character.url.split('/').filter(Boolean).pop() || '',
      }));
      const totalPages = Math.ceil(data.count / 10);
      setState({ results, isLoading: false, totalPages });
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
    totalPages?: number;
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

const fetchItemDetails = (
  id: string,
  setState: (details: { name: string; description: string }) => void,
) => {
  fetch(`${API}/${id}`)
    .then(response => response.json())
    .then((character: Character) => {
      const details = {
        name: character.name,
        description: character.birth_year,
      };
      setState(details);
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
    });
};

export { fetchResults, fetchItemDetails };
