import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './Pro';
import Head from './components/head';
import Menu from './components/menu';
import Nav from './components/nav';
import Footer from './components/Footer';
import Cart from './components/cart';
import Sign from './components/sign';
import Login from './components/login';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // 🔹 get JWT from storage
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    axios.get('http://localhost:5000/check', {
      headers: { Authorization: `Bearer ${token}` } // 🔹 send JWT in headers
    })
      .then(res => {
        if (res.status === 200) setIsAuthenticated(true);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login setAuth={setIsAuthenticated} />} />
        <Route path='/signin' element={<Sign />} />

        <Route path='/login' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <>
              <Nav />
              <Head />
              <Menu />
              <Footer />
            </>
          </ProtectedRoute>
        } />

        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
