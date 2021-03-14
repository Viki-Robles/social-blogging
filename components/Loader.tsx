import React, { FC } from "react";

export interface LoaderProps {
  show: boolean;
}

const Loader: FC<LoaderProps> = ({ show }) => {
  return show ? <div className="loader"></div> : null;
};

export default Loader;
