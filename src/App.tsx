import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import Pagination from './components/Pagination/Pagination';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { fetchResults } from './api/api';
import useSearchTerm from './useSearchTerm';
import styles from './App.module.css';

const App: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page ?? '1'));
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTermAndSave, isInitialized] = useSearchTerm('');
  const [results, setResults] = useState<
    { name: string; description: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      fetchResults(searchTerm || '', updateState, currentPage);
    }
  }, [searchTerm, isInitialized, currentPage]);

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    setSearchTermAndSave(trimmedTerm);
    fetchResults(trimmedTerm, updateState);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/search/${newPage}`);
  };

  const updateState = (
    state: Partial<{
      results: { name: string; description: string }[];
      isLoading: boolean;
      totalPages: number;
    }>,
  ) => {
    if (state.results) setResults(state.results);
    if (state.isLoading !== undefined) setIsLoading(state.isLoading);
    if (state.totalPages !== undefined) setTotalPages(state.totalPages);
  };

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <div className={styles['app__serch-bar']}>
          <SearchBar searchTerm={searchTerm || ''} onSearch={handleSearch} />
        </div>
        <div className={styles['app__search-result']}>
          <SearchResult results={results} isLoading={isLoading} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
