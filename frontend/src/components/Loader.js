import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[75vh] flex items-center justify-center">
      <div className="loader-container ">
        <div className="loader"></div>
        <div className="loader-text">Loading</div>
      </div>
    </div>
  );
};

export default Loader;
