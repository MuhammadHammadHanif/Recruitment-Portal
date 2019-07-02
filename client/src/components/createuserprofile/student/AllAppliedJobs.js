import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import Spinner from "../../common/Spinner";
import { getallappliedjobs } from "../../../actions/jobActions";

class AllAppliedJobs extends Component {
  componentDidMount() {
    this.props.getallappliedjobs();
  }
  render() {
    const { appliedjobs, loading } = this.props.job;
    let allappliedjobs;
    if (loading) {
      allappliedjobs = <Spinner />;
    } else if (appliedjobs == null) {
    } else {
      allappliedjobs = "hgh";
      allappliedjobs = appliedjobs.map(companydata => (
        <tr key={companydata.jobsposting._id}>
          <td>
            <Link to={`/companyprofile/${companydata.user}`}>
              {companydata.companyname}
            </Link>
          </td>
          <td>
            <Link to={`/jobdetail/${companydata.jobsposting._id}`}>
              {companydata.jobsposting.jobtitle}
            </Link>
          </td>
          <td>
            <Moment format="DD MMM YYYY">
              {companydata.jobsposting.createdAt}
            </Moment>
          </td>
          <td>{companydata.jobsposting.location}</td>
          <td>{companydata.jobsposting.experience}</td>
          <td>{companydata.jobsposting.education}</td>
        </tr>
      ));
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 style={{ marginBottom: "20px" }} className="md-4 text-center">
              Applied Job(s)
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
              <tbody>{allappliedjobs}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

AllAppliedJobs.propTypes = {
  profile: PropTypes.object.isRequired,
  getallappliedjobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  job: state.job
});

export default connect(
  mapStateToProps,
  { getallappliedjobs }
)(AllAppliedJobs);
