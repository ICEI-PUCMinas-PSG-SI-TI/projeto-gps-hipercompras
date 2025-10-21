import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', { email, senha });
      const usuario = res.data.usuario;

      // Salva no estado global e no localStorage
      setUser(usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      navigate('/'); // volta para Home
    } catch (err) {
      if (err.response) {
        setErro(err.response.data.error);
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
