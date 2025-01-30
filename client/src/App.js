import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import Welcome from './pages/Welcome/Welcome.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Loading from './components/ui/Loading.jsx';
import { useAuth } from './hooks/useAuth.js';
import './App.scss';
import './styles.scss';
function App() {
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
