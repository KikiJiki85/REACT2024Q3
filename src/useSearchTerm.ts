import { useState, useEffect, useCallback } from 'react';

const useSearchTerm = (initialTerm: string) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    } else {
      setSearchTerm(initialTerm);
    }
    setIsInitialized(true);
  }, [initialTerm]);

  const setSearchTermAndSave = useCallback((newTerm: string) => {
    setSearchTerm(newTerm);
    localStorage.setItem('searchTerm', newTerm);
  }, []);

  return [searchTerm, setSearchTermAndSave, isInitialized] as const;
};

export default useSearchTerm;
