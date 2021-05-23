import React from "react";
import "./card-list-style.css";
import { Card } from "../cards/card";

export const CardList = (props) => {
  return (
    <div className="card-list">
      <div className="AddDocument" onClick={props.AddDocument}>
        <h1>+ADD</h1>
      </div>
      {props.DocValue.map((value, i) => (
        <Card key={i} value={value} />
      ))}
    </div>
  );
};
