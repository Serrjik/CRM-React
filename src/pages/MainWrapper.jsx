import React from "react";

import Nav from "./Nav";

export default function MainWrapper(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <Nav />
        {props.children}
      </div>
    </div>
  );
}
