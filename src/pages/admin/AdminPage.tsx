import Layout from '@/components/layout/Layout';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminFiltersProvider } from '@/contexts/AdminFiltersContext';

const AdminPage = () => {
  // Placeholder: In production, check actual user role from auth
  const isAdmin = true;

  return (
    <AdminFiltersProvider>
      <Layout hideFooter>
        <div className="pt-24">
          <AdminLayout isAdmin={isAdmin} />
        </div>
      </Layout>
    </AdminFiltersProvider>
  );
};

export default AdminPage;
