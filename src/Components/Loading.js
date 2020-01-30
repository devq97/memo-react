import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner animation="grow" variant="primary" />
    </div>
  )
};

export default Loading;