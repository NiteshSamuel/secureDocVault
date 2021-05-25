import React from "react";
import "./card-style.css";
export const Card = (props) => {
  return (
    <div className="Card">
      <h1>{props.value.name}</h1>
      <a target="_blank" href={`https://ipfs.io/ipfs/${props.value.docHash}`}>
        click here..
      </a>
    </div>
  );
};
