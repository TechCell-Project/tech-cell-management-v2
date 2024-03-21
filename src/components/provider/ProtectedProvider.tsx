'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/modules/auth/store';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/enum';
import { getOneSessionStorage } from '@/utilities/session.util';
import { User } from '@/modules/user-mnt/models';

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

  // useEffect to handle redirection based on authentication state.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isSignedIn) {
        push(Routes.SignIn);
      }
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSignedIn, push]);

  return <>{children}</>;
};
