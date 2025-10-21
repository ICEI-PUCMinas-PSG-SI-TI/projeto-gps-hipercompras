import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  // Verifica se usuário já está no localStorage
  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      setUser(JSON.parse(usuarioLogado));
    }
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
