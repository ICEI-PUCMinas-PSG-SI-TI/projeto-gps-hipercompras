import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/produtos/${id}`)
      .then(res => setProduto(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{produto.nome}</h2>
      <img src={produto.imagem} alt={produto.nome} style={{ width: '300px' }} />
      <p>Preço: R$ {produto.preco.toFixed(2)}</p>
      <p>Estoque: {produto.estoque}</p>
    </div>
  );
};

export default ProductPage;
