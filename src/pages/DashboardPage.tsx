import { useNavigate } from 'react-router-dom';
import { clearAuthSession, getStoredUser } from '../lib/auth-storage';

export function DashboardPage() {
  const navigate = useNavigate();
  const user = getStoredUser();

  function handleLogout() {
    clearAuthSession();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-background font-poppins">
      <header className="border-b border-border bg-white px-8 py-4 flex items-center justify-between">
        <img
          alt="X7 POS"
          className="h-10 w-auto max-w-[140px] object-contain"
          src="/logo-header.svg"
        />
        <button
          className="text-body-sm font-semibold text-primary-container hover:underline"
          onClick={handleLogout}
          type="button"
        >
          Sign out
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="surface-paper login-shadow rounded-lg p-8">
          <h1 className="text-h2 font-semibold text-text mb-4">
            Main Dashboard
          </h1>
          <p className="text-body-md text-text/70 mb-6">
            You are signed in as{' '}
            <span className="font-semibold text-text">{user?.email}</span>.
          </p>
          <p className="text-body-sm text-text/60">
            This is a placeholder dashboard. The full X7 POS administration
            panel will be built here.
          </p>
        </div>
      </main>
    </div>
  );
}
