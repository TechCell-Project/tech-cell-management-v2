'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

/**
 * ThemeProvider Component
 *
 * Provides theming functionality to the application by wrapping it with a theme provider
 * from Next.js themes library. Forwards props to the underlying NextThemesProvider.
 *
 * @param {Object} children - ReactNode representing the child components.
 * @prop {Readonly<ThemeProviderProps>} props - Additional props forwarded to the NextThemesProvider component.
 * @returns {JSX.Element} - JSX element containing the child components wrapped with the theme provider.
 */
export const ThemeProvider = ({
  children,
  ...props
}: Readonly<ThemeProviderProps>): JSX.Element => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
