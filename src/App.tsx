import { Component } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResult";

interface AppState {
    searchTerm: string;
    results: Array<{ name: string; description: string }>;
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchTerm: "",
            results: [],
        };
    }

    componentDidMount() {
        const savedSearchTerm = localStorage.getItem("searchTerm");
        if (savedSearchTerm) {
            this.setState({ searchTerm: savedSearchTerm }, this.fetchResults);
        } else {
            this.fetchResults();
        }
    }

    fetchResults = () => {
        const { searchTerm } = this.state;
        const trimmedSearchTerm = searchTerm.trim();

        if (trimmedSearchTerm) {
            const formData = new URLSearchParams();
            formData.append("name", trimmedSearchTerm);

            fetch(`https://stapi.co/api/v1/rest/character/search/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            })
                .then(response => response.json())
                .then(data => {
                    const results = data.characters.map((character: any) => ({
                        name: character.name,
                        description: character.uid,
                    }));
                    this.setState({ results });
                })
                .catch(error => console.error("Error fetching data:", error));
        } else {
            fetch("https://stapi.co/api/v1/rest/character/search", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(data => {
                    const results = data.characters.map((character: any) => ({
                        name: character.name,
                        description: character.uid,
                    }));
                    this.setState({ results });
                })
                .catch(error => console.error("Error fetching data:", error));
        }
    };

    handleSearch = (term: string) => {
        const trimmedTerm = term.trim();
        localStorage.setItem("searchTerm", trimmedTerm);
        this.setState({ searchTerm: trimmedTerm }, this.fetchResults);
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
