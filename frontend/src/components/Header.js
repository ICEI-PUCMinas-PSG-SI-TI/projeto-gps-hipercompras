import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem('usuario'); // remove do localStorage
    setUser(null); // limpa o estado
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#eee' }}>
      <h1>HiperCompras</h1>
      <div>
        {user ? (
          <>
            <span>Olá, {user.nome}</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Sair</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
