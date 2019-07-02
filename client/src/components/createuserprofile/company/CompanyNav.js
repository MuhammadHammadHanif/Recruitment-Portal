import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CompanyNav = ({ notifications }) => {
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <Link to="/createcompanyprofile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/addjob" className="btn btn-light">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Job Posting
        </Link>
        <Link to="/allstudents" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> All Students
        </Link>
        <Link to="/jobappliedbystudents" className="btn btn-light">
          <i className="fab fa-black-tie text-info mr-1" />
          Job Applied By Students
        </Link>
        <span class=" btn-group" style={{ marginLeft: "20px" }}>
          <button
            class="btn btn-light "
            type="button"
            data-toggle="dropdown"
            style={{ borderRadius: "50%" }}
          >
            <i class="fas fa-bell " />
          </button>

          <ul
            class="dropdown-menu "
            style={{
              padding: "15px",
              width: "350px",
              wordWrap: "break-word",
              lineHeight: "1.5"
            }}
          >
            {notifications !== null &&
              notifications.message.length !== 0 &&
              notifications.message.reverse() &&
              notifications.message.slice(0, 3).map(notification => (
                <span>
                  <li>{notification}</li>
                  <code
                    style={{
                      float: "right"
                    }}
                  >
                    By Admin
                  </code>
                  <hr />
                </span>
              ))}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default CompanyNav;
