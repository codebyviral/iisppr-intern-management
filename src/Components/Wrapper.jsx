import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="ml-[0] p-6 md:ml-[190px] min-h-screen">{children}</div>
  );
};

export default Wrapper;
