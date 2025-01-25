import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Navbar from './components/layout/Navbar';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className='App'>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
