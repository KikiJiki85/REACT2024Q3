import React from "react";

interface SearchResultsProps {
    results: Array<{ name: string; description: string }>;
    isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
    results,
    isLoading,
}) => {
    if ((!results || results.length === 0) && !isLoading) {
        return <div>No results found.</div>;
    }

    return (
        <>
            {isLoading ? (
                <div>
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

export default SearchResults;
