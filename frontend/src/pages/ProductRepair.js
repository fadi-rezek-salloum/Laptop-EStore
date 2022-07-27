import React, { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

import { faLaptop, faLaptopCode, faPhone, faTriangleExclamation, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RequestRepair = () => {
  const { user } = useContext(AuthContext);

  let api = useAxios();

  const [device_name, setDeviceName] = useState("");
  const [specs, setSpecs] = useState("");
  const [problem, setProblem] = useState("");
  const [mobile, setMobile] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await api.post(`api/products/repair-product/`, {
      user: user.user_id,
      device_name: device_name,
      specs: specs,
      problem: problem,
      mobile: mobile,
    });

    if (response.status === 200) {
      setSuccess(true);
    }
  };

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Request Repair</h2>
      <form method="post" className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div
          className={success ? "alert alert-success" : "d-none"}
          aria-live="assertive"
        >
          You have requested repairing your product!
        </div>
        <br />
        <label htmlFor="profession" className="form-label">
          <FontAwesomeIcon icon={faLaptop} className="me-2" />
          Device Model
        </label>
        <input
          type="text"
          name="device_name"
          id="device_name"
          className="form-control"
          onChange={(e) => setDeviceName(e.target.value)}
          value={device_name}
          placeholder="Model..."
        />
        <br />

        <label htmlFor="specs" className="form-label">
          <FontAwesomeIcon icon={faLaptopCode} className="me-2" />
          Device Specs
        </label>
        <textarea
          name="specs"
          id="specs"
          className="form-control"
          onChange={(e) => setSpecs(e.target.value)}
          value={specs}
          placeholder="Specs..."
        ></textarea>
        <br />

        <label htmlFor="problem" className="form-label">
          <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
          Device Problem
        </label>
        <textarea
          name="problem"
          id="problem"
          className="form-control"
          onChange={(e) => setProblem(e.target.value)}
          value={problem}
          placeholder="Problem..."
        ></textarea>
        <br />

        <label htmlFor="mobile" className="form-label">
          <FontAwesomeIcon icon={faPhone} className="me-2" />
          Mobile Number
        </label>
        <input
          type="text"
          name="mobile"
          id="mobile"
          className="form-control"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
          placeholder="Mobile..."
        />
        <br />

        <button type="submit" className="btn btn-primary w-100">
          <FontAwesomeIcon icon={faWrench} className="me-2" />
          Request Repair
        </button>
      </form>
    </section>
  );
};

export default RequestRepair;
