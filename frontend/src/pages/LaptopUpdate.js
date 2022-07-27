import React, { useState } from "react";

import useAxios from "../utils/useAxios";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LaptopUpdate = (props) => {
  const product = props?.location?.state;

  const [name, setName] = useState(`${product.name}`);

  const [gpu, setGpu] = useState(`${product.get_gpu}`);
  const [cpu, setCpu] = useState(`${product.get_cpu}`);
  const [ram, setRam] = useState(`${product.get_ram}`);
  const [screenSize, setScreenSize] = useState(`${product.get_screen_size}`);

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

    fd.append("cpu", cpu);
    fd.append("gpu", gpu);
    fd.append("ram", ram);
    fd.append("screen_size", screenSize);

    fd.append("price", price);

    if (image) {
      fd.append("image", image, image.name);
    }

    let response = await api.put(
      `api/products/laptop-update/${product.id}/`,
      fd
    );

    if (response.status === 200) {
      setSuccess(true);
    }
  };

  return (
    <section className="container mt-5">
      <h2 className="text-center">Update Laptop</h2>
      <br />
      <div
        className={success ? "alert alert-success" : "d-none"}
        aria-live="assertive"
      >
        Laptop has been updated!
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

        <label htmlFor="cpu" className="form-label">
          CPU
        </label>
        <input
          type='text'
          name="cpu"
          className="form-control"
          onChange={(e) => setCpu(e.target.value)}
          value={cpu}
          required
        />
        <br />

        <label htmlFor="gpu" className="form-label">
          GPU
        </label>
        <input
          type='text'
          name="gpu"
          className="form-control"
          onChange={(e) => setGpu(e.target.value)}
          value={gpu}
          required
        />
        <br />

        <label htmlFor="ram" className="form-label">
          RAM
        </label>
        <input
          type='text'
          name="ram"
          className="form-control"
          onChange={(e) => setRam(e.target.value)}
          value={ram}
          required
        />
        <br />

        <label htmlFor="screenSize" className="form-label">
          Screen Size
        </label>
        <input
          type='text'
          name="screenSize"
          className="form-control"
          onChange={(e) => setScreenSize(e.target.value)}
          value={screenSize}
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

export default LaptopUpdate;
