import { Component, ChangeEvent } from "react";

interface SearchBarProps {
    searchTerm: string;
    onSearch: (term: string) => void;
}

interface SearchBarState {
    input: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {
            input: props.searchTerm,
        };
    }

    componentDidUpdate(prevProps: SearchBarProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.setState({ input: this.props.searchTerm });
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ input: event.target.value });
    };

    handleSearch = () => {
        this.props.onSearch(this.state.input);
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default SearchBar;
