import React from "react";

function Card({ label, imageLink, imageCSS, description }) {
  return (
    <div>
      <p className="text-black font-semibold text-4xl py-6">{label}</p>
      <img src={imageLink} className={imageCSS} />
      <p className="text-black font-medium text-base py-4">{description}</p>
    </div>
  );
}

export default Card;
