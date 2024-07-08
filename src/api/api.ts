type Character = {
    name: string;
    uid: string;
};

type ApiResponse = {
    characters: Character[];
};

const fetchAllCharacters = (
    setState: (state: {
        isLoading: boolean;
        results?: { name: string; description: string }[];
    }) => void,
) => {
    setState({ isLoading: true });

    fetch("https://stapi.co/api/v1/rest/character/search", {
        method: "GET",
    })
        .then(response => response.json())
        .then((data: ApiResponse) => {
            const results = data.characters.map((character: Character) => ({
                name: character.name,
                description: character.uid,
            }));
            setState({ results, isLoading: false });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setState({ isLoading: false });
        });
};

const fetchCharactersByName = (
    name: string,
    setState: (state: {
        isLoading: boolean;
        results?: { name: string; description: string }[];
    }) => void,
) => {
    const formData = new URLSearchParams();
    formData.append("name", name);

    setState({ isLoading: true });
    fetch(`https://stapi.co/api/v1/rest/character/search/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
    })
        .then(response => response.json())
        .then((data: ApiResponse) => {
            const results = data.characters.map((character: Character) => ({
                name: character.name,
                description: character.uid,
            }));
            setState({ results, isLoading: false });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setState({ isLoading: false });
        });
};

const fetchResults = (
    searchTerm: string,
    setState: (state: {
        isLoading: boolean;
        results?: { name: string; description: string }[];
    }) => void,
) => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm) {
        fetchCharactersByName(trimmedSearchTerm, setState);
    } else {
        fetchAllCharacters(setState);
    }
};

export { fetchResults };
