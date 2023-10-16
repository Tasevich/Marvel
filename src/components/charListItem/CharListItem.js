import React from "react";

const CharListItem = ({ onCharSelected, id, name, thumbnail }) => {
  return (
    <li key={id} className="char__item" onClick={() => onCharSelected(id)}>
      <img
        style={
          thumbnail.indexOf("image_not_available") > -1
            ? { objectFit: "contain" }
            : { objectFit: "cover" }
        }
        src={thumbnail}
        alt="abyss"
      />
      <div className="char__name">{name}</div>
    </li>
  );
};

export default CharListItem;
