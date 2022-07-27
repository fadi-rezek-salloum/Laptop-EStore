import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

import {
  faLaptop,
  faAlignLeft,
  faTag,
  faDollarSign,
  faCalendarDays,
  faPenToSquare,
  faTrash,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useHistory } from "react-router-dom";
import useAxios from "../utils/useAxios";

const ProductDetail = (props) => {
  const { user } = useContext(AuthContext);

  const product = props?.location?.state;
  const productID = product?.id;

  let api = useAxios();

  const history = useHistory();

  const handleDelete = async () => {
    let response = await api.delete(
      `api/products/laptop-delete/${productID}/`
    );

    if (response.status === 200) {
      history.push("/");
    }
  };

  const handleBuy = async (id) => {
    let response = await api.post(
      `api/products/buy-laptop/${id}/`,
      {
        user: user.user_id,
        laptop: id,
      }
    );

    if (response.status === 200) {
      alert('You bought this item successfully!')
    }
  }

  return (
    <section className="container my-5">
      <div className="row">
        <div className="col-4">
          <img
            src={`http://localhost:8000${product?.image}`}
            alt={`${product?.name}`}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-1"></div>
        <div className="col-7">
          <h2 className="text-center">
            <FontAwesomeIcon
              icon={faLaptop}
              className="me-2"
            />
            {product?.name}
          </h2>
          <hr />
          <br />
          <h4 className="text-muted">
            <FontAwesomeIcon icon={faAlignLeft} className="me-2" />
            Specs
          </h4>
          <p>CPU: {product?.get_cpu}</p>
          <p>GPU: {product?.get_gpu}</p>
          <p>RAM: {product?.get_ram}</p>
          <p>Screen Size: {product?.get_screen_size}</p>
          <br />
          <div className="row">
            <div className="col-6">
              <h4 className="text-muted">
                <FontAwesomeIcon icon={faDollarSign} className="me-2" />
                Price
              </h4>
              <p>{product?.price}$</p>
            </div>
          </div>
          <hr />
          <br />
          <h6 className="text-muted text-center">
            <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
            Created at: {product?.created.split("T")[0]}
          </h6>
          <div
            className={
              user.role === "admin" ? "row mt-5 text-center" : "d-none"
            }
          >
            <div className="col-6">
              <Link
                to={{
                  pathname: `/laptop/update/${product.id}`,
                  state: product,
                }}
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                Update Product
              </Link>
            </div>
            <div className="col-6">
              <button className="btn btn-danger" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Delete Product
              </button>
            </div>
          </div>

          <div
            className="row mt-5 text-center"
          >
            <button
              className="btn btn-primary w-50 mx-auto"
              onClick={() => handleBuy(product.id)}
            >
              <FontAwesomeIcon icon={faCartPlus} className="me-2" />
              Buy Product
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
