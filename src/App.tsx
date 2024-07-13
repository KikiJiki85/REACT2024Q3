import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
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
    { name: string; description: string; id: string }[]
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
    setCurrentPage(1);
    fetchResults(trimmedTerm, updateState, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/search/${newPage}`);
  };

  const handleItemClick = (id: string) => {
    navigate(`/search/${currentPage}/details/${id}`);
  };

  const updateState = (
    state: Partial<{
      results: { name: string; description: string; id: string }[];
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
        <div className="container">
          <div className={styles['app__serch-bar']}>
            <SearchBar searchTerm={searchTerm || ''} onSearch={handleSearch} />
          </div>

          <SearchResult
            results={results}
            isLoading={isLoading}
            onItemClick={handleItemClick}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default App;
