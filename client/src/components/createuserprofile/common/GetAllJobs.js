import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Moment from "react-moment";

import Spinner from "../../common/Spinner";
import { getalljobs, applyjob } from "../../../actions/jobActions";

class GetAllJobs extends Component {
  componentDidMount() {
    this.props.getalljobs();
  }

  // Apply job
  onClick = (e, c_id, j_id) => {
    e.preventDefault();
    this.props.applyjob(c_id, j_id);
  };

  render() {
    const { alljobs, loading } = this.props.job;
    const { user } = this.props.auth;
    let getalljobs;
    if (loading) {
      getalljobs = <Spinner />;
    } else if (alljobs == null) {
      getalljobs = <p>No Jobs Found</p>;
    } else {
      getalljobs = alljobs.map(companydata =>
        companydata.jobsposting.map(job => (
          <tr key={job._id}>
            <td>
              <Link to={`/companyprofile/${companydata.user}`}>
                {companydata.companyname}
              </Link>
            </td>
            <td>
              <Link to={`/jobdetail/${job._id}`}>{job.jobtitle}</Link>
            </td>
            <td>
              <Moment format="DD MMM YYYY">{job.createdAt}</Moment>
            </td>
            <td>{job.location}</td>
            <td>{job.experience}</td>
            <td>{job.education}</td>
            {user.role !== "Admin" && (
              <button
                onClick={e => this.onClick(e, companydata.user, job._id)}
                className="btn btn-info"
              >
                Apply
              </button>
            )}
          </tr>
        ))
      );
    }
    return (
      <div className="container">
        <Link
          to="/dashboard"
          className="btn btn-light"
          style={{ marginBottom: "30px" }}
        >
          Go Back
        </Link>
        <div className="row">
          <div className="col-md-12">
            <h3 style={{ marginBottom: "20px" }} className="md-4 text-center">
              All Posted Job(s)
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job</th>
                  <th>Posted At</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Education</th>

                  <th />
                </tr>
              </thead>
              <tbody>{getalljobs}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

GetAllJobs.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  applyjob: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  job: state.job,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getalljobs, applyjob }
)(withRouter(GetAllJobs));
