import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export function RegisterPage() {
  return (
    <AuthLayout>
      <div className="surface-paper login-shadow rounded-lg overflow-hidden w-full p-8 text-center">
        <h2 className="text-h2 text-text font-semibold mb-4">
          Create your account
        </h2>
        <p className="text-body-md text-text/60 mb-6">
          Merchant onboarding registration will be available here. Contact your
          administrator if you need access to X7 POS.
        </p>
        <Link
          className="text-body-sm text-primary-container font-semibold hover:underline"
          to="/login"
        >
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
