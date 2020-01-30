import React from "react";

const SpinnerBtn = () => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn disabled"
      >
        <i className="fa fa-circle-o-notch fa-spin fa-3x"></i>
      </button>
    </div>
  );
}

const SolidBtn = ({name}) => {
    return (
      <div>
        <button className="btn btn-block btn-primary btn-lg auth-form-btn">
          {name}
        </button>
      </div>
    );
}

export {
    SpinnerBtn, SolidBtn
}
