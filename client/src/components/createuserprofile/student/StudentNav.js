import React from "react";
import { Link } from "react-router-dom";

const StudentNav = ({ notifications }) => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/createstudentprofile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/addexperience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/addeducation" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
      <Link to="/deleteexperienceeducation" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Delete Experience/Education
      </Link>
      <Link to="/getalljobs" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Job Apply
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
  );
};

export default StudentNav;
