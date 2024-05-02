'use client';

import { rehydrateAuthState } from '~auth/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';

const MINUTE = 1000 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * MINUTE,
      retry: 3,
      retryDelay: 2000,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * AppProvider Component
 *
 * Provides global query functionality and handles authentication state rehydration
 * for the entire application.
 *
 * @param {Object} children - ReactNode representing the child components.
 * @returns {JSX.Element} - JSX element containing the child components.
 */
export const AppProvider = ({ children }: Readonly<{ children: ReactNode }>): JSX.Element => {
  useEffect(() => {
    rehydrateAuthState();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
