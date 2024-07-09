import { Component } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResult';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchResults } from './api/api';

interface AppState {
  searchTerm: string;
  results: { name: string; description: string }[];
  isLoading: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, () => {
        fetchResults(savedSearchTerm, this.updateState);
      });
    } else {
      fetchResults('', this.updateState);
    }
  }

  handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.setState({ searchTerm: trimmedTerm }, () => {
      fetchResults(trimmedTerm, this.updateState);
    });
  };

  updateState = (state: Partial<AppState>) => {
    this.setState(state as Pick<AppState, keyof AppState>);
  };

  render() {
    const { searchTerm, results, isLoading } = this.state;

    return (
      <ErrorBoundary>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <div style={{ flex: '1', borderBottom: '1px solid black' }}>
            <SearchBar searchTerm={searchTerm} onSearch={this.handleSearch} />
          </div>
          <div style={{ flex: '4', overflowY: 'scroll' }}>
            <SearchResults results={results} isLoading={isLoading} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
