import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { fetchResults } from './api/api';
import useSearchTerm from './useSearchTerm';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm, isInitialized] = useSearchTerm('');
  const [results, setResults] = useState<
    { name: string; description: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      fetchResults(searchTerm || '', updateState);
    }
  }, [searchTerm, isInitialized]);

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    setSearchTerm(trimmedTerm);
    setIsLoading(true);
    fetchResults(trimmedTerm, updateState);
  };

  const updateState = (
    state: Partial<{
      results: { name: string; description: string }[];
      isLoading: boolean;
    }>,
  ) => {
    if (state.results) setResults(state.results);
    if (state.isLoading !== undefined) setIsLoading(state.isLoading);
  };

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
          <SearchBar searchTerm={searchTerm || ''} onSearch={handleSearch} />
        </div>
        <div style={{ flex: '4', overflowY: 'scroll' }}>
          <SearchResult results={results} isLoading={isLoading} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
