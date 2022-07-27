import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const AccessoriesList = () => {
  let [products, setProducts] = useState([]);

  let getProducts = async () => {
    let response = await axios.get("http://localhost:8000/api/products/accessories/");

    if (response.status === 200) {
      setProducts(response.data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="container my-5">
      <div className="row d-flex justify-content-start products__list">
        {products.map((product) => (
          <div className="card products__list-item" key={product.id}>
            <img
              src={`http://localhost:8000${product.image}`}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon
                  icon={faKeyboard}
                  className="me-2"
                />
                {product.name}
              </h5>
              <Link
                to={{
                  pathname: `accessory/details/${product.id}`,
                  state: product,
                }}
                className="btn btn-primary w-100 mt-2"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccessoriesList;
