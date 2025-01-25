import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup';
import Navbar from './Components/Navbar';
import './App.scss';

function App() {
  const [user, setUser] = useState(true);
  return (
    <div className='App'>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
