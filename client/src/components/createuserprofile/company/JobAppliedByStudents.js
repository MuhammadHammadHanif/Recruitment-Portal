import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";

import Spinner from "../../common/Spinner";

class JobAppliedByStudents extends Component {
  render() {
    const { profile, loading } = this.props.profile;
    let jobappliedbystudents;
    if (loading) {
      jobappliedbystudents = <Spinner />;
    } else if (profile == null) {
      jobappliedbystudents = <Redirect to="/dashboard" />;
    } else {
      jobappliedbystudents = profile.jobsposting.map(jobs =>
        jobs.jobapplied.map(job => (
          <tr key={job._id}>
            <td>
              <Link to={`/jobdetail/${job.jobid}`}>{jobs.jobtitle}</Link>
            </td>
            <td>
              <Moment format="DD MMM YYYY">{jobs.postingstartdate}</Moment>
            </td>
            <td>{jobs.location}</td>
            <td>
              <Link to={`/studentprofile/${job.user._id}`}>
                {job.user.name}
              </Link>
            </td>
            <td>{job.user.email}</td>
            <td>
              <Moment format="DD MMM YYYY">{job.createdAt}</Moment>
            </td>
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
              Job Applied By Student(s)
            </h3>

            <table className="table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Created At</th>
                  <th>Location</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Applied At</th>
                </tr>
              </thead>
              <tbody>{jobappliedbystudents}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

JobAppliedByStudents.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(JobAppliedByStudents);
