import React from "react";
import NotFoundSvg from "./404.svg";

const NotFoundImage: React.FC = () => {
  return (
    <img
      src={NotFoundSvg}
      alt="NotFound"
      style={{ maxWidth: "500px", marginBottom: "50px" }}
      height="auto"
    />
  );
};

export default NotFoundImage;
