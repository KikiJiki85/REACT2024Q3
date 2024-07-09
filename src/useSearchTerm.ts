import { useState, useEffect } from 'react';

const useSearchTerm = (initialTerm: string) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', searchTerm);
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchTerm;
