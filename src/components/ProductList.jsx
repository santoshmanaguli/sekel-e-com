import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, updateTotal } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(updateTotal());
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} width="100" />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
