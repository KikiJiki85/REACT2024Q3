import { useEffect, useState, ChangeEvent } from 'react';
import { SearchBarProps } from './types';

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
    <>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default SearchBar;
