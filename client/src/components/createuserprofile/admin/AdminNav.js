import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/allstudents" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> All Students
      </Link>
      <Link to="/allcompanies" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> All Companies
      </Link>
      <Link to="/getalljobs" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        All Jobs
      </Link>
      <Link to="/sendnotification" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Send Notification
      </Link>
    </div>
  );
};

export default AdminNav;
