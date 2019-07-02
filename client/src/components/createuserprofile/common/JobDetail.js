import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

import { viewjob } from "../../../actions/jobActions";
import Spinner from "../../common/Spinner";

class JobDetail extends Component {
  componentDidMount() {
    this.props.viewjob(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { viewjob, loading } = this.props.job;

    let jobdetail;

    if (viewjob == null || loading) {
      jobdetail = <Spinner />;
    } else {
      jobdetail = (
        <div>
          {viewjob[0].jobsposting.map(job => (
            <div className="row ">
              <div className="col-md-3">
                <div key={job._id}>
                  <h3>{job.jobtitle}</h3>
                  <p style={{ marginTop: "-8px" }}>
                    <code>
                      Posted at:{" "}
                      {
                        <Moment format="YYYY/MM/DD">
                          {job.postingstartdate}
                        </Moment>
                      }
                    </code>
                  </p>
                  <h4>Description</h4>
                  <p className="text-muted">{job.jobdescription}</p>
                  <h4>Duties</h4>
                  <ol style={{ listStyle: "none", marginLeft: "-38px" }}>
                    {job.duties.map((duty, i) => (
                      <li key={i}>{duty}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="col-md-3">
                <h4>Email</h4>
                <p>{job.email}</p>
                <h4>Skills</h4>
                <ol style={{ listStyle: "none", marginLeft: "-38px" }}>
                  {job.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ol>
                <h4>Salary</h4>
                <p>{job.salary}</p>
              </div>
              <div className="col-md-3">
                <h4>Education</h4>
                <p>{job.education}</p>
                <h4>Experience</h4>
                <p>{job.experience}</p>
                <h4>Location</h4>
                <p>{job.location}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="container">
        <button onClick={this.goBack} className="btn btn-light mb-3 float-left">
          Go Back
        </button>
        <div className="row">
          <div className="col-md-12">
            <h3 style={{ marginBottom: "20px" }} className="md-4 ">
              Job Details
            </h3>
          </div>
        </div>
        {jobdetail}
      </div>
    );
  }
}

JobDetail.propTypes = {
  errors: PropTypes.object.isRequired,
  viewjob: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  job: state.job
});

export default connect(
  mapStateToProps,
  { viewjob }
)(withRouter(JobDetail));
