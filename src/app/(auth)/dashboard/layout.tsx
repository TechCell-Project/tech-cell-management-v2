'use client';

import LoadingPage from '@/app/loading';
import { ProtectedProvider } from '@/components/provider';
import dynamic from 'next/dynamic';

const SidebarDynamic = dynamic(() => import('@/components/navigation').then((res) => res.Sidebar), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ProtectedProvider>
      <SidebarDynamic>{children}</SidebarDynamic>
    </ProtectedProvider>
  );
};

export default DashboardLayout;
