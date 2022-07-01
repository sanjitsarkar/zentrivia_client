import React from "react";
import { Link } from "react-router-dom";
const ProfileTab = ({ to, title, icon }) => {
  return (
    <Link
      to={`user/${to}`}
      className="row items-center  gap-1 bg-black br-sm p-2 flex profile-tab"
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

export default ProfileTab;
