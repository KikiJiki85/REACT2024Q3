import React from 'react';
import { SearchResultProps } from './types';
import styles from './SearchResult.module.css';
import loaderGif from '../../assets/loader.gif';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  isLoading,
  onItemClick,
}) => {
  if (isLoading) {
    return (
      <div className={styles['search-result__is-loading']}>
        <img src={loaderGif} alt="Loading..." />
      </div>
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
        <li
          key={result.id}
          onClick={() => onItemClick(result.id)}
          className={styles['search-result__item']}
        >
          <h3>{result.name}</h3>
          <p>Year of birth: {result.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
