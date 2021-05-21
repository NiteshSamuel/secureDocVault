import React from "react";
import "./ListItems.css";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="list" key={item.key}>
        {console.log(items)}

        <h2>{item.text}</h2>
      </div>
    );
  });
  return <div>{listItems}</div>;
}

export default ListItems;
