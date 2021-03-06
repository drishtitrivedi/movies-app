import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedGenre,
    onItemSelect,
  } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          className={
            selectedGenre === item
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          <a onClick={() => onItemSelect(item)}>{item[textProperty]}</a>
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
