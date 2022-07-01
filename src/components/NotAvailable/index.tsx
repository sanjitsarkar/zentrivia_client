import React from "react";
import empty from "../../assets/icons/empty.gif";

type Props = {
  title:String,
  img:String,
  children:ReactFR
  classes:String,
  type:String
}
const NotAvailable = ({
  title,
  img = empty,
  children,
  classes = "",
  type = "",
}:Props) => {
  return (
    <div
      className={`w-full rounded-full grid place-content-center  ${
        type === "404" ? "gap-2" : "gap-1 "
      } place-items-center ${classes}`}
    >
      <img
        src={img}
        className={`${type === "404" ? "w-80" : "w-80 img-rounded"}`}
        alt={title}
      />
      <h2 className="text-center text-xl text-dark">{title}</h2>
      {children}
    </div>
  );
};

export default NotAvailable;
