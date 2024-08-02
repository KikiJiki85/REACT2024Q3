import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGetCharactersQuery } from './api/apiSlice';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import Pagination from './components/Pagination/Pagination';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import useSearchTerm from './useSearchTerm';
import { useTheme } from './components/ThemeContext/ThemeContext';
import styles from './App.module.css';
import ItemDetails from './components/ItemDetails/ItemDetails';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { page, id } = router.query;
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt((page as string) ?? '1'),
  );
  const [searchTerm, setSearchTermAndSave] = useSearchTerm('');
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    (id as string) || null,
  );

  const { data, isLoading, error } = useGetCharactersQuery({
    searchTerm,
    page: currentPage,
  });

  const totalPages = data ? Math.ceil(data.count / 10) : 0;

  useEffect(() => {
    if (!page || isNaN(Number(page))) {
      router.push('/not-found');
      return;
    }
    setCurrentPage(parseInt(page as string));
  }, [page, router]);

  useEffect(() => {
    setSelectedItemId((id as string) || null);
  }, [id]);

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    setSearchTermAndSave(trimmedTerm);
    setCurrentPage(1);
    router.push('/search/1');
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/search/${newPage}`);
  };

  const handleItemClick = (id: string) => {
    router.push(`/search/${currentPage}/details/${id}`);
  };

  const closeDetails = () => {
    router.push(`/search/${currentPage}`);
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
            results={data?.results || []}
            isLoading={isLoading}
            error={error}
            onItemClick={handleItemClick}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {selectedItemId && <ItemDetails id={selectedItemId} />}
      </div>
    </ErrorBoundary>
  );
};

export default SearchPage;
