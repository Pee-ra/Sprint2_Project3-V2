import { Outlet } from 'react-router-dom';
import { TopNavigation } from '../views/TopNavigation';

export function Layout({ user, onLogout, isAdmin = false }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation
        user={user}
        onLogout={onLogout}
        isAdmin={isAdmin}
      />
      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}