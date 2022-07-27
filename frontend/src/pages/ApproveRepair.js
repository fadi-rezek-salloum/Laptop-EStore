import React, { useState, useEffect } from "react";

import useAxios from "../utils/useAxios";

const ApproveRepair = () => {
  const [repairRequests, setRepairRequests] = useState([]);

  let api = useAxios();

  let getRequests = async () => {
    let response = await api.get("api/products/approve-products-repair/");

    if (response.status === 200) {
      console.log(response.data);
      setRepairRequests(response.data);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleApprove = async (id) => {
    let response = await api.post(`api/products/approve-repair/${id}/`, {
      id,
    });

    if (response.status === 200) {
      window.location.reload();
    }
  };

  const handleDeny = async (id) => {
    let response = await api.post(`api/products/deny-repair/${id}/`, {
      id,
    });

    if (response.status === 200) {
      window.location.reload();
    }
  };

  return (
    <section className="container my-5">
      <h2 className="text-center mb-5">Repair Requests</h2>
      <div className="accordion" id="accordionExample">
        {repairRequests.map((br) => (
          <div className="accordion-item" key={br.id}>
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                User: {br.username} - Product: {br.device_name}
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>Device Specs: {br.specs}</p>
                <br />
                <p>Device Problem: {br.problem}</p>
                <p>Mobile Number: {br.mobile}</p>
                <br />
                <span className="text-muted">{br.created.split("T")[0]}</span>
                <div className="row mt-3">
                  <div className="col-3">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleApprove(br.id)}
                    >
                      Approve
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDeny(br.id)}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApproveRepair;
