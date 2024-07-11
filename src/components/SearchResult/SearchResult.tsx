import React from 'react';
import { SearchResultProps } from './types';
import styles from './SearchResult.module.css';

const SearchResult: React.FC<SearchResultProps> = ({ results, isLoading }) => {
  if ((!results || results.length === 0) && !isLoading) {
    return <div>No results found.</div>;
  }

  return (
    <>
      {isLoading ? (
        <div className={styles['search-result']}>
          <img src="/src/assets/loader.gif" alt="Loading..." />
        </div>
      ) : (
        results.map((result, index) => (
          <div key={index}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))
      )}
    </>
  );
};

export default SearchResult;
