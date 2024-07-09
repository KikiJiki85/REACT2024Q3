import { useEffect, useState, ChangeEvent } from "react";

interface SearchBarProps {
    searchTerm: string;
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    const [input, setInput] = useState(searchTerm);

    useEffect(() => {
        setInput(searchTerm);
    }, [searchTerm]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSearch = () => {
        onSearch(input);
    };

    return (
        <>
            <input type="text" value={input} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
        </>
    );
};

export default SearchBar;
