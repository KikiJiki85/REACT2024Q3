import { renderHook, act } from '@testing-library/react-hooks';
import useSearchTerm from '../useSearchTerm';

describe('useSearchTerm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with initial term if no saved term in localStorage', () => {
    const { result } = renderHook(() => useSearchTerm('initial'));

    expect(result.current[0]).toBe('initial');
    expect(result.current[2]).toBe(true);
  });

  it('should initialize with saved term from localStorage', () => {
    localStorage.setItem('searchTerm', 'savedTerm');
    const { result } = renderHook(() => useSearchTerm('initial'));

    expect(result.current[0]).toBe('savedTerm');
    expect(result.current[2]).toBe(true);
  });

  it('should update search term and save to localStorage', () => {
    const { result } = renderHook(() => useSearchTerm('initial'));

    act(() => {
      result.current[1]('newTerm');
    });

    expect(result.current[0]).toBe('newTerm');
    expect(localStorage.getItem('searchTerm')).toBe('newTerm');
  });
});
