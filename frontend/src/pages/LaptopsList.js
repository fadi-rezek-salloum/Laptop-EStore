import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const LaptopsList = () => {
  let [products, setProducts] = useState([]);

  let [professions, setProfessions] = useState([])
  let [cpus, setCPUs] = useState([])
  let [gpus, setGPUs] = useState([])
  let [rams, setRAMs] = useState([])
  let [screenSizes, setScreenSizes] = useState([])

  const get_professions = async () => {
    let response = await axios.get('http://localhost:8000/api/products/profession-list/')

    if (response.status === 200 ) {
      setProfessions(response.data)
    }
  }

  const get_cpus = async () => {
    let response = await axios.get('http://localhost:8000/api/products/cpu-list/')

    if (response.status === 200 ) {
      setCPUs(response.data)
    }
  }

  const get_gpus = async () => {
    let response = await axios.get('http://localhost:8000/api/products/gpu-list/')

    if (response.status === 200 ) {
      setGPUs(response.data)
    }
  }

  const get_rams = async () => {
    let response = await axios.get('http://localhost:8000/api/products/ram-list/')

    if (response.status === 200 ) {
      setRAMs(response.data)
    }
  }

  const get_screen_sizes = async () => {
    let response = await axios.get('http://localhost:8000/api/products/screen-size-list/')

    if (response.status === 200 ) {
      setScreenSizes(response.data)
    }
  }

  useEffect(() => {
    get_professions()
    get_cpus()
    get_gpus()
    get_rams()
    get_screen_sizes()
  }, [])

  let max_price = 0

  products.forEach((p) => {
    if ( p.price > max_price ) {
      max_price = p.price
    }
  })

  const filterProducts = async (e) => {
    e.preventDefault()

    let response = await axios.get('http://localhost:8000/api/products/laptops/', { params: {
        cpu: e.target.cpu.value,
        gpu: e.target.gpu.value,
        ram: e.target.ram.value,
        screen_size: e.target.screenSize.value,
        profession: e.target.profession.value,
        price: e.target.price.value,
      }
    })

    if ( response.status === 200 ) {
      setProducts(response.data)
    }
    else {
      alert('err')
    }
  }

  let getProducts = async () => {
    let response = await axios.get("http://localhost:8000/api/products/laptops/");

    if (response.status === 200) {
      setProducts(response.data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const setMaxPrice = (price) => {
    let elem = document.getElementById('maxPrice')
    elem.innerHTML = `$${parseInt(price)}`
  }

  const handleReset = async (e) => {
    e.preventDefault()

    let response = await axios.get('http://localhost:8000/api/products/laptops/')

    if ( response.status === 200 ) {
      setProducts(response.data)
    }
    else {
      alert('err')
    }
  }

  return (
    <section className="my-5">
      <div className="container-fluid mb-5 px-3">
        <form onSubmit={filterProducts} className="row">
          <div className="col-2">
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Select Profession
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <select name="profession" className="form-select">
                    <option value="">
                      Select Profession...
                    </option>
                    {professions.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-2">
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                Select CPU
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li>
                  <select name="cpu" className="form-select">
                    <option value="">
                      Select CPU...
                    </option>
                    {cpus.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-2">
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                Select GPU
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                <li>
                  <select name="gpu" className="form-select">
                    <option value="">
                      Select GPU...
                    </option>
                    {gpus.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-2">
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-expanded="false">
                Select Ram
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton4">
                <li>
                  <select name="ram" className="form-select">
                    <option value="">
                      Select Ram...
                    </option>
                    {rams.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-2">
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton5" data-bs-toggle="dropdown" aria-expanded="false">
                Select Screen Size
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                <li>
                  <select name="screenSize" className="form-select">
                    <option value="">
                      Select Screen Size...
                    </option>
                    {screenSizes.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-2">
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton6" data-bs-toggle="dropdown" aria-expanded="false">
                Select Max Price
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton6">
                <li className="px-1">
                <span className="font-weight-bold text-primary me-2 mt-1">0</span>
                <input className="border-0" name='price' type="range" min='0' max={parseInt(max_price)} onChange={(e) => setMaxPrice(e.target.value)} step="10" />
                <span className="font-weight-bold text-primary ms-2 mt-1">{parseInt(max_price)}</span>
                <p className="text-center" id="maxPrice">$0</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-1 mt-3">
            <input type="submit" value="Filter" className="btn btn-primary" />
          </div>
          <div className="col-1 mt-3">
            <input type="reset" onClick={handleReset} value="Reset" className="btn btn-danger" />
          </div>
        </form>
      </div>
      <div className="container">
        <div className=" row d-flex justify-content-start products__list">
          {products.length !== 0 ? (products.map((product) => (
            <div className="card products__list-item" key={product.id}>
              <img
                src={`http://localhost:8000${product.image}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon
                    icon={faLaptop}
                    className="me-2"
                  />
                  {product.name}
                </h5>
                <div className="card-text">
                  <div className="row d-flex justify-content-center">
                    <div className="product__spec col-12 my-2">
                      CPU: {product.get_cpu}
                    </div>
                    <div className="product__spec col-12 my-2">
                      GPU: {product.get_gpu}
                    </div>
                    <div className="product__spec col-12 my-2">
                      Ram: {product.get_ram}
                    </div>
                    <div className="product__spec col-12 my-2">
                      Screen Size: {product.get_screen_size}
                    </div>
                  </div>
                </div>
                <Link
                  to={{
                    pathname: `laptop/details/${product.id}`,
                    state: product,
                  }}
                  className="btn btn-primary w-100 mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))) : <h1 className="text-center mt-5">There are no laptops with theses specs!</h1>}
        </div>
      </div>
    </section>
  );
};

export default LaptopsList;
