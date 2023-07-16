import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} height={100} width={100} alt="loading..." />
    </div>
  );
};

export default Spinner;
