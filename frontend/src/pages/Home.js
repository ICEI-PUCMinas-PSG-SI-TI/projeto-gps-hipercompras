import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/produtos')
      .then(res => setProdutos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {produtos.map(produto => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
};

export default Home;
