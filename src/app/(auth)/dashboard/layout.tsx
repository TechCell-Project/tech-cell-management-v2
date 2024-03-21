import { Sidebar } from '@/components/navigation';
import { ProtectedProvider } from '@/components/provider';

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ProtectedProvider>
      <Sidebar />
    </ProtectedProvider>
  );
};

export default DashboardLayout;
