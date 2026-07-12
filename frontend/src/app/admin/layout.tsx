import AdminRouteGuard from '@/components/AdminRouteGuard';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-gray-950">
        <AdminSidebar />
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </AdminRouteGuard>
  );
}
