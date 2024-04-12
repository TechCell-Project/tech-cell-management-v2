import LoadingPage from '@/app/loading';
import { Sidebar } from '@/components/navigation';
import { ProtectedProvider } from '@/components/provider';
import { Suspense } from 'react';

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ProtectedProvider>
      <Suspense fallback={<LoadingPage />}>
        <Sidebar>{children}</Sidebar>
      </Suspense>
    </ProtectedProvider>
  );
};

export default DashboardLayout;
