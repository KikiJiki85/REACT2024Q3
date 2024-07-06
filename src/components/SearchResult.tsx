import React from "react";

interface SearchResultsProps {
    results: Array<{ name: string; description: string }>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    if (!results || results.length === 0) {
        return <div>No results found.</div>;
    }

    return (
        <div>
            {results.map((result, index) => (
                <div key={index}>
                    <h3>{result.name}</h3>
                    <p>{result.description}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
