import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deletejob } from "../../../actions/jobActions";

class JobsPosted extends Component {
  onDelete = (e, id) => {
    e.preventDefault();
    this.props.deletejob(id);
  };
  render() {
    const jobs = this.props.jobspost.map(job => (
      <tr key={job._id}>
        <td>
          <Link to={`/jobdetail/${job._id}`}>{job.jobtitle}</Link>
        </td>
        <td>{job.location}</td>
        <td>{job.experience}</td>
        <td>{job.education}</td>
        <td>
          <Moment format="YYYY/MM/DD">{job.postingstartdate}</Moment>
        </td>
        <td>
          <button
            onClick={e => this.onDelete(e, job._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h3 style={{ marginBottom: "20px" }} className="md-4 text-center">
          Job(s)
        </h3>
        {this.props.jobspost.length === 0 ? (
          <h5 className="md-4 text-center" style={{ color: "red" }}>
            No Jobs Added
          </h5>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Experience</th>
                <th>Education</th>
                <th>Date Posted</th>
                <th />
              </tr>
            </thead>
            <tbody>{jobs}</tbody>
          </table>
        )}
      </div>
    );
  }
}

JobsPosted.propTypes = {
  deletejob: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletejob }
)(JobsPosted);
