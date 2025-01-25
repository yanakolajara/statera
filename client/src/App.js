import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar';
import './App.scss';

function App() {
  const [user, setUser] = useState(true);
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
