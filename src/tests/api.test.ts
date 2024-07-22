import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { fetchResults, fetchItemDetails } from '../api/api';

const flushPromises = () => new Promise(setImmediate);

const originalConsoleError = console.error;

beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

global.fetch = vi.fn();

describe('fetchResults', () => {
  it('should fetch data from API and update state', async () => {
    const setState = vi.fn();
    const mockResponse = {
      count: 1,
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };

    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    fetchResults('Luke', setState);
    await flushPromises();

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(1, { isLoading: true });
    expect(setState).toHaveBeenNthCalledWith(2, {
      results: [
        {
          name: 'Luke Skywalker',
          description: '19BBY',
          id: '1',
        },
      ],
      isLoading: false,
      totalPages: 1,
    });
  });

  it('should handle API errors and update state', async () => {
    const setState = vi.fn();

    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('API Error'),
    );

    fetchResults('Luke', setState);
    await flushPromises();

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(1, { isLoading: true });
    expect(setState).toHaveBeenNthCalledWith(2, { isLoading: false });
  });
});

describe('fetchItemDetails', () => {
  it('should fetch item details from API and update state', async () => {
    const setState = vi.fn();
    const mockCharacter = {
      name: 'Luke Skywalker',
      eye_color: 'blue',
      gender: 'male',
      hair_color: 'blond',
      height: '172',
      skin_color: 'fair',
    };

    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => mockCharacter,
    });

    fetchItemDetails('1', setState);
    await flushPromises();

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(1, {
      name: '',
      eyeColor: '',
      gender: '',
      hairColor: '',
      height: '',
      skinColor: '',
      isLoading: true,
    });
    expect(setState).toHaveBeenNthCalledWith(2, {
      name: 'Luke Skywalker',
      eyeColor: 'blue',
      gender: 'male',
      hairColor: 'blond',
      height: '172',
      skinColor: 'fair',
      isLoading: false,
    });
  });

  it('should handle API errors and update state', async () => {
    const setState = vi.fn();

    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('API Error'),
    );

    fetchItemDetails('1', setState);
    await flushPromises();

    setState.mock.calls.forEach((call, index) => {
      console.log(`setState call ${index + 1}:`, call);
    });

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(1, {
      name: '',
      eyeColor: '',
      gender: '',
      hairColor: '',
      height: '',
      skinColor: '',
      isLoading: true,
    });
    expect(setState).toHaveBeenNthCalledWith(2, {
      name: '',
      eyeColor: '',
      gender: '',
      hairColor: '',
      height: '',
      skinColor: '',
      isLoading: false,
    });
  });
});
