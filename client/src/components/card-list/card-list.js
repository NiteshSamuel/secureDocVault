import React from "react";
import "./card-list-style.css";
import { Card } from "../cards/card";

export const CardList = (props) => {
  return (
    <div className="card-list">
      {props.DocValue.map((value) => (
        <Card key={value.id} value={value} />
      ))}
    </div>
  );
};
