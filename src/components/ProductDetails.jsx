import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, updateTotal } from '../redux/cartSlice';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(updateTotal());
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
