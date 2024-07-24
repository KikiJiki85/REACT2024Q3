import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useGetCharactersQuery } from './api/apiSlice';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import Pagination from './components/Pagination/Pagination';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import useSearchTerm from './useSearchTerm';
import styles from './App.module.css';
import { useTheme } from './components/ThemeContext/ThemeContext';
import { isContext } from 'vm';

const App: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page ?? '1'));
  const [searchTerm, setSearchTermAndSave] = useSearchTerm('');

  const { data, isLoading } = useGetCharactersQuery({
    searchTerm,
    page: currentPage,
  });

  const totalPages = data ? Math.ceil(data.count / 10) : 0;

  console.log(data);

  useEffect(() => {
    if (!page || isNaN(Number(page))) {
      navigate('/not-found');
      return;
    }
    setCurrentPage(parseInt(page));
  }, [page, navigate]);

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    setSearchTermAndSave(trimmedTerm);
    setCurrentPage(1);
    navigate('/search/1');
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/search/${newPage}`);
  };

  const handleItemClick = (id: string) => {
    navigate(`/search/${currentPage}/details/${id}`);
  };

  return (
    <ErrorBoundary>
      <div
        className={`${styles.app} ${theme === 'light' ? styles.light : styles.dark}`}
      >
        <div className={styles['app__main-panel']}>
          <button onClick={toggleTheme} className={styles['app__theme-button']}>
            Toggle Theme
          </button>
          <div className={styles['app__serch-bar']}>
            <SearchBar searchTerm={searchTerm || ''} onSearch={handleSearch} />
          </div>

          <SearchResult
            results={data?.results || []}
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
