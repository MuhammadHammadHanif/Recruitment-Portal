import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { addjob } from "../../../actions/jobActions";

class CreateJob extends Component {
  state = {
    jobtitle: "",
    jobdescription: "",
    duties: "",
    skills: "",
    education: "",
    experience: "",
    salary: "",
    email: "",
    location: "",
    postingenddate: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    const {
      jobtitle,
      jobdescription,
      duties,
      skills,
      education,
      experience,
      salary,
      email,
      location,
      postingenddate
    } = this.state;
    const newJob = {
      jobtitle,
      jobdescription,
      duties,
      skills,
      education,
      experience,
      salary,
      email,
      location,
      postingenddate
    };
    this.props.addjob(newJob, this.props.history);
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile" style={{ marginBottom: "20px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to="/dashboard"
                className="btn btn-light"
                style={{ marginBottom: "30px" }}
              >
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Job</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="jobtitle"
                  value={this.state.jobtitle}
                  onChange={this.onChange}
                  error={errors.jobtitle}
                />
                <TextFieldGroup
                  placeholder="* Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="* Duties"
                  name="duties"
                  value={this.state.duties}
                  onChange={this.onChange}
                  error={errors.duties}
                  info="Please use comma separated values (eg. Attend Mettings,Supervising etc)"
                />
                <TextFieldGroup
                  placeholder="* Skill Set"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. Node.js,HTML,CSS etc)"
                />
                <TextFieldGroup
                  placeholder="* Education/Degree"
                  name="education"
                  value={this.state.education}
                  onChange={this.onChange}
                  error={errors.education}
                  info="Please enter Qualification for the job"
                />
                <TextFieldGroup
                  placeholder="* Experience"
                  name="experience"
                  value={this.state.experience}
                  onChange={this.onChange}
                  error={errors.experience}
                />
                <TextFieldGroup
                  placeholder="Salary"
                  name="salary"
                  value={this.state.salary}
                  onChange={this.onChange}
                  error={errors.salary}
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  name="postingenddate"
                  type="date"
                  value={this.state.postingenddate}
                  onChange={this.onChange}
                  error={errors.postingenddate}
                  info="At which date this job post is applicable"
                />
                <TextAreaFieldGroup
                  placeholder="* Job Description"
                  name="jobdescription"
                  value={this.state.jobdescription}
                  onChange={this.onChange}
                  error={errors.jobdescription}
                  info="Please enter complete Job Description"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateJob.propTypes = {
  errors: PropTypes.object.isRequired,
  addjob: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addjob }
)(withRouter(CreateJob));
