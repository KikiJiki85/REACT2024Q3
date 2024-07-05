import { Component } from "react";
import SearchBar from "./components/SearchBar";

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
        const apiUrl = trimmedSearchTerm
            ? `https://stapi.co/api/v1/rest/character/search?name=${trimmedSearchTerm}`
            : `https://stapi.co/api/v1/rest/character/search`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ results: data.items }))
            .catch(error => console.error("Error fetching data:", error));
    };

    handleSearch = (term: string) => {
        const trimmedTerm = term.trim();
        localStorage.setItem("searchTerm", trimmedTerm);
        this.setState({ searchTerm: trimmedTerm }, this.fetchResults);
    };

    render() {
        const { searchTerm } = this.state;

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
            </div>
        );
    }
}

export default App;
