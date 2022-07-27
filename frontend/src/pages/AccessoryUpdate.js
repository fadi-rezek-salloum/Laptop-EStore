import React, { useState } from "react";

import useAxios from "../utils/useAxios";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccessoryUpdate = (props) => {
  const product = props?.location?.state;

  const [name, setName] = useState(`${product.name}`);
  const [price, setPrice] = useState(`${product.price}`);
  const [image, setImage] = useState(null);

  const [success, setSuccess] = useState(false);

  let api = useAxios();

  const fileSelectedHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("name", name);
    fd.append("price", price);

    if (image) {
      fd.append("image", image, image.name);
    }

    let response = await api.put(
      `api/products/accessory-update/${product.id}/`,
      fd
    );

    if (response.status === 200) {
      setSuccess(true);
    }
  };

  return (
    <section className="container mt-5">
      <h2 className="text-center">Update Accessory</h2>
      <br />
      <div
        className={success ? "alert alert-success" : "d-none"}
        aria-live="assertive"
      >
        Accessory has been updated!
      </div>
      <br />
      <form
        method="post"
        encType="multipart/form-data"
        className="w-50 mx-auto"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="form-label">
          Product's name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <br />

        <label htmlFor="price" className="form-label">
          Product's price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          className="form-control"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />
        <br />

        <label htmlFor="image" className="form-label">
          Product's Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="form-control"
          onChange={fileSelectedHandler}
        />
        <br />

        <button className="btn btn-primary mb-5 w-100" type="submit">
          <FontAwesomeIcon icon={faPenToSquare} className="mx-2" />
          Edit Product
        </button>
      </form>
    </section>
  );
};

export default AccessoryUpdate;
