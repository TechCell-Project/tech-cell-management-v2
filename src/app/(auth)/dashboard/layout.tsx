'use client';

import LoadingPage from '@/app/loading';
import { ProtectedProvider } from '@/components/provider';
import { Routes } from '@/constants/enum';
import { useAuthStore } from '@/modules/auth/store';
import { UserRoleEnum } from '@techcell/node-sdk';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SidebarDynamic = dynamic(() => import('@/components/navigation').then((res) => res.Sidebar), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (pathname === Routes.Dashboard) {
      if (user?.user.role !== UserRoleEnum.Manager) {
        router.replace(Routes.MntOrder);
      } else {
        router.replace(Routes.MntUserStaff);
      }
    }
  }, [pathname, router, user?.user.role]);

  return (
    <ProtectedProvider>
      <SidebarDynamic>{children}</SidebarDynamic>
    </ProtectedProvider>
  );
};

export default DashboardLayout;
