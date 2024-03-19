import { ClerkProvider } from '@clerk/nextjs';
import { viVN } from '@clerk/localizations';
import { ThemeProvider } from './ThemeProvider';

export const AppProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider>
      <ClerkProvider
        localization={viVN}
        appearance={{
          elements: {
            logoBox: {
              height: '35px',
            },
            formButtonPrimary: {
              marginTop: 10,
              backgroundColor: '#ee4949',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#fb3030',
              },
            },
            footerActionLink: {
              color: '#ee4949',
              '&:hover': {
                color: '#fb3030',
              },
            },
          },
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
};
