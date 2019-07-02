import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getcurrentprofile,
  clearviewprofile,
  getnotification
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import CompanyNav from "../createuserprofile/company/CompanyNav";
import StudentNav from "../createuserprofile/student/StudentNav";
import JobsPosted from "../createuserprofile/company/JobsPosted";
import AllAppliedJobs from "../createuserprofile/student/AllAppliedJobs";
import AdminNav from "../createuserprofile/admin/AdminNav";

class Dashboard extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.clearviewprofile();

    if (user.role !== "Admin") {
      this.props.getcurrentprofile();
      this.props.getnotification(user.id);
    }
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading, notifications } = this.props.profile;

    let dashboardContent;
    if (user.role !== "Admin" ? profile == null || loading : loading) {
      dashboardContent = <Spinner />;
    } else {
      // check logged in user role

      // for company
      if (user.role === "Company") {
        // check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <p className="lead text-muted display-4">
                Welcome{" "}
                <Link to={`/companyprofile/${profile.user}`}>
                  {profile.companyname}
                </Link>
              </p>
              <CompanyNav notifications={notifications} />
              <JobsPosted jobspost={profile.jobsposting} />
            </div>
          );
        } else {
          // User is logged in but has no profile
          dashboardContent = (
            <div>
              <p className="lead text-muted display-4">Welcome {user.name}</p>
              <p>
                You have not yet setup a profile, please create your profile
              </p>
              <Link to="/createcompanyprofile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          );
        }
      }

      // for Student
      if (user.role === "Student") {
        // check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <p className="lead text-muted display-4">
                Welcome{" "}
                <Link to={`/studentprofile/${profile.user}`}>{user.name}</Link>
              </p>
              <StudentNav notifications={notifications} />
              <AllAppliedJobs />
            </div>
          );
        } else {
          // User is logged in but has no profile
          dashboardContent = (
            <div>
              <p className="lead text-muted display-4">Welcome {user.name}</p>
              <p>
                You have not yet setup a profile, please create your profile
              </p>
              <Link to="/createstudentprofile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          );
        }
      }

      // for admin
      if (user.role === "Admin") {
        dashboardContent = (
          <div>
            <p className="lead text-muted display-4">Welcome {user.name}</p>
            <AdminNav />
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propsTypes = {
  getcurrentprofile: PropTypes.func.isRequired,
  clearviewprofile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getnotification: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getcurrentprofile, clearviewprofile, getnotification }
)(Dashboard);
