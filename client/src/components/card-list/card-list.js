import React from "react";
import "./card-list-style.css";
import { Card } from "../cards/card";

export const CardList = (props) => {
  return (
    <div className="card-list">
      <div className="AddDocument">
        <button className="upload" onClick={props.addDocument}>
          <h2>uplode File</h2>
        </button>
        <form onSubmit={props.onSubmit}>
          <input type="file" onChange={props.captureFile} />
          <input type="submit" />
        </form>
      </div>
      {props.DocValue.map((value, i) => (
        <Card key={i} value={value} />
      ))}
    </div>
  );
};
