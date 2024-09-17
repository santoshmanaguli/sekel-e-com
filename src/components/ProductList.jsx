import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, updateTotal } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import './ProductList.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(updateTotal());
  };

  return (
    <div className="container">
      <h3 className="text-center p-2">Results</h3>
      <div>
        {products.map((product) => (
          <div key={product.id} className="border p-4 d-flex align-items-center">
            <div className="d-block">
              <img src={product.image} alt={product.title} width="100" />
            </div>
            <div className="d-block ps-5 p-3">
              <Link className="productTitle" to={`/product/${product.id}`}>{product.title}</Link>
              <h2>${product.price}</h2>
              <p>{product.description}</p>
              <button type="button" className="btn btn-warning" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
