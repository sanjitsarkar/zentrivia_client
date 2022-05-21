import React from "react";
import empty from "../../assets/icons/empty.gif";
const NotAvailable = ({ title }) => {
  return (
    <div className="w-full  grid place-content-center gap-2 place-items-center">
      <img
        src={empty}
        alt="empty"
        className="aspect-square img-rounded "
        style={{ width: "clamp(15rem,20rem,30rem)" }}
      />
      {title && <h2 className="text-center">{title}</h2>}
    </div>
  );
};

export default NotAvailable;
