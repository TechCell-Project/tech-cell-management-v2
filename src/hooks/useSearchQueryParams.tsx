'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Define the type for the custom hook's return value
 */
type UseSearchQueryParams = {
  createQueryString: (name: string, value: string) => string;
  deleteQueryString: (name: string) => string;
};

/**
 * Custom hook to handle query parameters in the URL.
 * It provides functions to create and delete query parameters.
 * 
 * @returns An object containing functions for creating and deleting query parameters.
 */
export const useSearchQueryParams = (): UseSearchQueryParams => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  return { createQueryString, deleteQueryString };
};
