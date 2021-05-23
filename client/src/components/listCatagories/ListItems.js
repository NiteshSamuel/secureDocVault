import React from "react";
import "./ListItems.css";
import { Item } from "../Item/item";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <button
        className="list"
        key={item.key}
        onClick={() => props.handleItem(item.key)}
      >
        <Item key={item.key} value={item.text} />
      </button>
    );
  });
  return <div>{listItems}</div>;
}

export default ListItems;
