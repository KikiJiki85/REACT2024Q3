import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import Pagination from './components/Pagination/Pagination';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { fetchResults } from './api/api';
import useSearchTerm from './useSearchTerm';
import styles from './App.module.css';
import { useTheme } from './components/ThemeContext/ThemeContext';

const App: React.FC = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page ?? '1'));
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTermAndSave, isInitialized] = useSearchTerm('');
  const [results, setResults] = useState<
    { name: string; description: string; id: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!page || isNaN(Number(page))) {
      navigate('/not-found');
      return;
    }
    setCurrentPage(parseInt(page));
  }, [page, navigate]);

  useEffect(() => {
    if (isInitialized) {
      fetchResults(searchTerm || '', updateState, currentPage);
    }
  }, [searchTerm, isInitialized, currentPage]);

  useEffect(() => {
    if (id) {
      setDetailsOpen(true);
    } else {
      setDetailsOpen(false);
    }
  }, [id]);

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

  const closeDetails = () => {
    navigate(`/search/${currentPage}`);
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
      <div
        className={`${styles.app} ${theme === 'light' ? styles.light : styles.dark}`}
      >
        <div
          className={styles['app__main-panel']}
          onClick={detailsOpen ? closeDetails : undefined}
        >
          <button onClick={toggleTheme} className={styles['app__theme-button']}>
            Toggle Theme
          </button>
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

        <Outlet context={{ closeDetails }} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
