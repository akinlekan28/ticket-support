import React from "react";

export default function CountCard({ count, cardTitle }) {
  return (
    <div className="col-md-4 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">
            <div className="ml-sm-3 ml-md-0 ml-xl-3 mt-2 mt-md-2">
              <p>{cardTitle}</p>
              <h1>{count}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
