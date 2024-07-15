import { useEffect, useState, ChangeEvent } from 'react';
import { SearchBarProps } from './types';
import styles from './SearchBar.module.css';

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [input, setInput] = useState(searchTerm);

  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(input);
    }
  };

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch} className={styles['search-bar__button']}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
