import { Component } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResult";

interface Character {
    name: string;
    uid: string;
}

interface ApiResponse {
    characters: Character[];
}

interface AppState {
    searchTerm: string;
    results: { name: string; description: string }[];
    isLoading: boolean;
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchTerm: "",
            results: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        const savedSearchTerm = localStorage.getItem("searchTerm");

        if (savedSearchTerm) {
            this.setState({ searchTerm: savedSearchTerm }, () => {
                this.fetchResults(savedSearchTerm);
            });
        } else {
            this.fetchResults("");
        }
    }

    fetchAllCharacters = () => {
        this.setState({ isLoading: true });
        fetch("https://stapi.co/api/v1/rest/character/search", {
            method: "GET",
        })
            .then(response => response.json())
            .then((data: ApiResponse) => {
                const results = data.characters.map((character: Character) => ({
                    name: character.name,
                    description: character.uid,
                }));
                this.setState({ results, isLoading: false });
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    fetchCharactersByName = (name: string) => {
        const formData = new URLSearchParams();
        formData.append("name", name);

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
                this.setState({ results, isLoading: false });
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    fetchResults = (searchTerm: string) => {
        const trimmedSearchTerm = searchTerm.trim();

        if (trimmedSearchTerm) {
            this.fetchCharactersByName(trimmedSearchTerm);
        } else {
            this.fetchAllCharacters();
        }
    };

    handleSearch = (term: string) => {
        const trimmedTerm = term.trim();
        localStorage.setItem("searchTerm", trimmedTerm);
        this.setState({ searchTerm: trimmedTerm }, () => {
            this.fetchResults(trimmedTerm);
        });
    };

    render() {
        const { searchTerm, results } = this.state;

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <div style={{ flex: "1", borderBottom: "1px solid black" }}>
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearch={this.handleSearch}
                    />
                </div>
                <div style={{ flex: "4", overflowY: "scroll" }}>
                    <SearchResults results={results} />
                </div>
            </div>
        );
    }
}

export default App;
