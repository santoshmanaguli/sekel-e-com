import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, updateTotal } from "../redux/cartSlice";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(updateTotal());
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
      <div className="text-center">
        <h3>Details</h3>
        <br />
      </div>
      <div className="text-center">
        <img src={product.image} alt={product.title} width="200" />
      </div>
      <div className="text-center">
        {" "}
        <h3>{product.title}</h3>
        <br />
        {product.rating && (
          <div className="d-flex justify-content-center">
            {id && renderStars(product?.rating?.rate)}&nbsp;&nbsp;
            {product?.rating?.count}
          </div>
        )}
        <h4 className="mt-3">${product.price}</h4>
        <br />
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        <div className="m-4">
          <h5>About this item</h5>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
