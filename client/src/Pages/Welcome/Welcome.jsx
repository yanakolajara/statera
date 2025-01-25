import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const WelcomePage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div>
      <h1>Welcome to the App!</h1>
      <p>Please sign up or log in to continue.</p>
    </div>
  );
};

export default WelcomePage;
