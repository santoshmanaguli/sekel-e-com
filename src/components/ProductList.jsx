import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, updateTotal } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart_count = localStorage.length;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(updateTotal());
    toast.success(`${product.title} added to cart!`);
  };

  const renderStars = (ratings) => {
    const fullStars = Math.floor(ratings);
    const halfStars = ratings % 1 !== 0;
    const emptyStars = 5 - Math.ceil(ratings);

    return (
      <div key={Math.floor(Math.random() * 100)} className="stars-rating">
        {[...Array(fullStars)].map((_, index) => (
          <i
            key={index}
            className="bi bi-star-fill"
            style={{ color: "red" }}
          ></i>
        ))}
        {[
          halfStars && (
            <i
              className="bi bi-star-half"
              key={Math.floor(Math.random() * 100)}
              style={{ color: "red" }}
            ></i>
          ),
        ]}
        {[...Array(emptyStars)].map((_, index) => (
          <i key={index} className="bi bi-star" style={{ color: "red" }}></i>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="p-2 d-flex align-items-center justify-content-between">
        <h3>E-commerce</h3>
        <Link className="cart-icon" to={"/cart"}>
          {cart_count == 0 && <i className="bi bi-cart"></i>}
          {cart_count > 0 && <i className="bi bi-cart-fill"></i>}
        </Link>
      </div>
      <div>
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 d-flex align-items-center"
          >
            <div className="d-block">
              <img src={product.image} alt={product.title} width="100" />
            </div>
            <div className="ps-5 p-3">
              <Link className="productTitle" to={`/product/${product.id}`}>
                {product.title}
              </Link>
              <div className="d-flex">
                {renderStars(product.rating.rate)}&nbsp;&nbsp;
                {product.rating.count}
              </div>
              <h2>${product.price}</h2>

              <p>{product.description.slice(0, 100) + "..."}</p>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleAddToCart(product)}
              >
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
