import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ value, onChange }) => {
  const countries = useSelector((state: RootState) => state.countries);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    if (inputValue.length > 0) {
      const filteredSuggestions = countries.filter(country =>
        country.toLowerCase().startsWith(inputValue.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete">
      <input type="text" value={value} onChange={handleChange} />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
