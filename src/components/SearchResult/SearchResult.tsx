import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../features/selectedItemsSlice';
import { RootState } from '../../store';
import { SearchResultProps } from './types';
import styles from './SearchResult.module.css';
import loaderGif from '../../assets/loader.gif';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  isLoading,
  error,
  onItemClick,
}) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems as { [key: string]: boolean },
  );

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
    <ul className={styles['search-result']}>
      {results.map(result => (
        <li key={result.url} className={styles['search-result__item']}>
          <h3
            onClick={() => onItemClick(result.url.split('/').slice(-2, -1)[0])}
          >
            {result.name}
          </h3>
          <p>Year of birth: {result.birth_year}</p>
          <input
            type="checkbox"
            checked={!!selectedItems[result.url]}
            onChange={() => dispatch(toggleItem(result.url))}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
