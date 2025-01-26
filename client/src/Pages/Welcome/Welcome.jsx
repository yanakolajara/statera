import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (user) {
    navigate('/');
  }
  return (
    <div>
      <h1>Welcome to the App!</h1>
      <p>Please sign up or log in to continue.</p>
    </div>
  );
};

export default Welcome;
