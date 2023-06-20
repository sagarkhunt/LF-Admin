import React from "react";
import { Spinner } from "reactstrap";
import "./loader.scss";

const CustomSpinner = () => {
  return (
    <div className="LoadingContainer">
      <div className="LoadingBox">
        <Spinner color="primary" />
      </div>
    </div>
  );
};
export default CustomSpinner;
