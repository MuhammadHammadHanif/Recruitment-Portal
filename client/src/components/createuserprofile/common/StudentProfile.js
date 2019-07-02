import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

import { getstudentviewprofile } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";

class StudentProfile extends Component {
  componentDidMount() {
    this.props.getstudentviewprofile(this.props.match.params.id);
  }
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { viewprofile, loading } = this.props.profile;

    let studentprofile;

    if (viewprofile == null || loading) {
      studentprofile = <Spinner />;
    } else {
      studentprofile = (
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <h1 className="display-4 text-center">{viewprofile.name}</h1>
                <p className="lead text-center">{viewprofile.email}</p>
                <p>
                  {viewprofile.city}, {viewprofile.country}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card card-body  mb-3">
                <h3 class="text-center text-info">John's Bio</h3>
                <p class="lead ">{viewprofile.bio}</p>
                <hr />
                <h3 class="text-center text-info">Skill Set</h3>
                <div class="row">
                  <div class="d-flex flex-wrap justify-content-center align-items-center">
                    {viewprofile.skills.map((skill, i) => (
                      <div class="p-3" key={i}>
                        <i class="fa fa-check" /> {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h3 class="text-center text-info">Experience</h3>
              <ul class="list-group">
                {viewprofile.experience.map((exp, i) => (
                  <li class="list-group-item" key={i}>
                    <h4>{exp.company}</h4>
                    <p>
                      <Moment format="MMM YYYY">{exp.from}</Moment> -{" "}
                      <Moment format="MMM YYYY">{exp.to}</Moment>
                    </p>
                    <p>
                      <strong>Position:</strong> {exp.title}
                    </p>
                    <p>
                      <strong>Location: </strong> {exp.location}
                    </p>
                    <p>
                      <strong>Description:</strong> {exp.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div class="col-md-6">
              <h3 class="text-center text-info">Education</h3>
              <ul class="list-group">
                {viewprofile.education.map((edu, i) => (
                  <li class="list-group-item" key={i}>
                    <h4>{edu.school}</h4>
                    <p>
                      <Moment format="MMM YYYY">{edu.from}</Moment> -{" "}
                      <Moment format="MMM YYYY">{edu.to}</Moment>
                    </p>
                    <p>
                      <strong>Degree: </strong>
                      {edu.degree}
                    </p>
                    <p>
                      <strong>Field Of Study: </strong>
                      {edu.fieldofstudy}
                    </p>
                    <p>
                      <strong>Grade: </strong>
                      {edu.grade}
                    </p>

                    <p>
                      <strong>Description:</strong> {edu.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-6">
                <button
                  onClick={this.goBack}
                  className="btn btn-light mb-3 float-left"
                >
                  Go Back
                </button>
              </div>
              <div className="col-6" />
            </div>
            {studentprofile}
          </div>
        </div>
      </div>
    );
  }
}

StudentProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getstudentviewprofile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getstudentviewprofile }
)(withRouter(StudentProfile));
