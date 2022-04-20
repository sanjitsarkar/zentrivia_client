import React from "react";

const NotAvailable = ({ title }) => {
  return (
    <div className="w-full  grid place-content-center gap-2 place-items-center">
      <h2 className="text-center">{title}</h2>
    </div>
  );
};

export default NotAvailable;
