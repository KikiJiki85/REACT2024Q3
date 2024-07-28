import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import { PaginationProps } from '../components/Pagination/types';

const TestComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
    navigate(`/?page=${pageNumber}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

const LocationDisplay: React.FC = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
};

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TestComponent
                  currentPage={1}
                  totalPages={5}
                  onPageChange={() => {}}
                />
                <LocationDisplay />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    expect(screen.getByTestId('location-display')).toHaveTextContent('?page=2');
  });
});
