import React from "react";
import "./ListItems.css";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="list" key={item.key}>
        <p>
          <script>var Alert = ReactBootstrap.Alert;</script>
          <input
            type="button"
            id={item.key}
            className="output"
            value={item.text}
            onChange={(e) => {
              props.setUpdate(e.target.value, item.key);
            }}
            STYLE="color: #3319A7; font-family: Verdana; font-weight: bold; font-size: 12px; background-color: #A6A3A7;"
            size="10"
            maxlength="20"
          />
          {/* <span>
        
         <button className="faicons" onClick={() => {
            props.deleteItem(item.key)
        }} icon="trash" /> 
        </span>  */}
        </p>
      </div>
    );
  });
  return <div>{listItems}</div>;
}

export default ListItems;
