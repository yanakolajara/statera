import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Welcome from './pages/Welcome/Welcome';
import Navbar from './components/layout/Navbar';
import Loading from './components/ui/Loading';
import { useAuth } from './hooks/useAuth.js';
import './App.scss';

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        {user ? (
          <Route path='/' element={<Home />} />
        ) : (
          <Route path='/' element={<Welcome />} />
        )}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
