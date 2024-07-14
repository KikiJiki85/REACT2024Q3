import { ApiResponse, Character, CharacterDetails, State } from './types';

const API = 'https://swapi.dev/api/people';

const getDataFromAPI = (
  query: string,
  page: number,
  setState: (state: State) => void,
) => {
  setState({ isLoading: true });
  fetch(`${API}?search=${query}&page=${page}`)
    .then(response => response.json())
    .then((data: ApiResponse) => {
      const results = data.results.map((character: Character) => ({
        name: character.name,
        description: character.birth_year,
        id: `${character.url.split('/').slice(-2, -1)[0]}`,
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
  setState: (state: State) => void,
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
  setState: (state: {
    name: string;
    eyeColor: string;
    gender: string;
    hairColor: string;
    height: string;
    skinColor: string;
    isLoading: boolean;
  }) => void,
) => {
  setState({
    name: '',
    eyeColor: '',
    gender: '',
    hairColor: '',
    height: '',
    skinColor: '',
    isLoading: true,
  });

  fetch(`${API}/${id}`)
    .then(response => response.json())
    .then((character: CharacterDetails) => {
      const details = {
        name: character.name,
        eyeColor: character.eye_color,
        gender: character.gender,
        hairColor: character.hair_color,
        height: character.height,
        skinColor: character.skin_color,
        isLoading: false,
      };
      setState(details);
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
      setState({
        name: '',
        eyeColor: '',
        gender: '',
        hairColor: '',
        height: '',
        skinColor: '',
        isLoading: true,
      });
    });
};

export { fetchResults, fetchItemDetails };
