import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ produto }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px', margin: '10px' }}>
      <img src={produto.imagem} alt={produto.nome} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <Link to={`/produto/${produto.id}`}>Ver Detalhes</Link>
    </div>
  );
};

export default ProductCard;
