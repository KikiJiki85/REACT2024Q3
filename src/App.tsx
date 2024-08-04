'use client';

import { useRouter } from 'next/navigation';
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

interface SearchPageProps {
  page: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ page }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page, 10));
  const [searchTerm, setSearchTermAndSave] = useSearchTerm('');
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const { data, isLoading, error } = useGetCharactersQuery({
    searchTerm,
    page: currentPage,
  });

  const totalPages = data ? Math.ceil(data.count / 10) : 0;

  useEffect(() => {
    setCurrentPage(parseInt(page, 10));
  }, [page]);

  useEffect(() => {
    if (isNaN(currentPage)) {
      router.push('/not-found');
      return;
    }
  }, [currentPage, router]);

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
    setSelectedItemId(id);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedItemId(null);
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
        {detailsOpen && selectedItemId && <ItemDetails id={selectedItemId} />}
      </div>
    </ErrorBoundary>
  );
};

export default SearchPage;
