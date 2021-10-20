import React from "react";

export default function StepsItem(props) {
  const { item, onRemove, onModify } = props;
  
  return (
    <tr>
      <td>{item.date}</td>
      <td>{item.distance}</td>
      <td>
        <span className="material-icons" onClick={() => onModify(item.id)}>
          create
        </span>
        <span className="material-icons" onClick={() => onRemove(item.id)}>
          delete_forever
        </span>
      </td>
    </tr>
  );
}