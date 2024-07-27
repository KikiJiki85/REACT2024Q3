import React from 'react';
import {
  toggleItem,
  unselectAllItems,
} from '../../features/selectedItemsSlice';
import { RootState } from '../../store';
import { SearchResultProps } from './types';
import styles from './SearchResult.module.css';
import loaderGif from '../../assets/loader.gif';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { csvFormat } from 'd3-dsv';
import { saveAs } from 'file-saver';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  isLoading,
  error,
  onItemClick,
}) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state: RootState) => state.selectedItems.items,
  );
  const allSelectedItemsDetails = useAppSelector(
    (state: RootState) => state.selectedItems.itemDetails,
  );

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  const selectedResults = Object.values(allSelectedItemsDetails);

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const handleDownload = () => {
    const csvData = selectedResults.map(item => ({
      name: item.name,
      description: item.homeworld,
      url: item.url,
      birth_year: item.birth_year,
    }));
    const csvContent = csvFormat(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedCount}_items.csv`);
  };

  if (isLoading) {
    return (
      <div className={styles['search-result__is-loading']}>
        <img src={loaderGif} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['search-result__error']}>Error loading data.</div>
    );
  }

  if ((!results || results.length === 0) && !isLoading) {
    return (
      <div className={styles['search-result__no-results']}>
        No results found.
      </div>
    );
  }

  return (
    <>
      <ul className={styles['search-result']}>
        {results.map(result => (
          <li key={result.url} className={styles['search-result__item']}>
            <h3
              onClick={() =>
                onItemClick(result.url.split('/').slice(-2, -1)[0])
              }
            >
              {result.name}
            </h3>
            <p>Year of birth: {result.birth_year}</p>
            <input
              type="checkbox"
              checked={!!selectedItems[result.url]}
              onChange={() =>
                dispatch(toggleItem({ url: result.url, item: result }))
              }
            />
          </li>
        ))}
      </ul>
      {selectedCount > 0 && (
        <div className={styles['flyout']}>
          <p>{selectedCount} items are selected</p>
          <button onClick={handleUnselectAll}>Unselect all</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </>
  );
};

export default SearchResult;
