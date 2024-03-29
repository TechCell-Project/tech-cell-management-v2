'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '~auth/store';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/enum';
import LoadingPage from '@/app/loading';

/**
 * ProtectedProvider component responsible for managing user authentication state.
 * It checks session storage for user data on mount and redirects the user based on their authentication state.
 *
 * @param {Object} children - ReactNode representing the child components.
 * @returns {JSX.Element} - JSX element containing the child components.
 */
export const ProtectedProvider = ({ children }: Readonly<{ children: ReactNode }>): JSX.Element => {
  const { isSignedIn } = useAuthStore();
  const { push } = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      const timeout = setTimeout(() => {
        push(Routes.SignIn);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSignedIn, push]);

  return !isSignedIn ? <LoadingPage loading /> : <>{children}</>;
};
