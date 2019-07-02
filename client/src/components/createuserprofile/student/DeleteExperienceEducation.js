import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import isEmpty from "../../../validations/isEmpty";
import {
  deleteexperience,
  deleteeducation
} from "../../../actions/profileActions";

class DeleteExperienceEducation extends Component {
  onDeleteExperience = (e, id) => {
    e.preventDefault();
    this.props.deleteexperience(id);
  };
  onDeleteEducation = (e, id) => {
    e.preventDefault();
    this.props.deleteeducation(id);
  };
  render() {
    const { experience, education } = this.props.profile.profile;
    let showexperience;
    let showeducation;
    if (experience.length !== 0) {
      showexperience = (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {experience.map(exp => (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                  {exp.to === null ? (
                    " Present"
                  ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    onClick={e => this.onDeleteExperience(e, exp._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (isEmpty(experience)) {
      showexperience = <p className="lead text-muted">No Experience Found</p>;
    }
    if (education.length !== 0) {
      showeducation = (
        <table className="table">
          <thead>
            <tr>
              <th>Institute</th>
              <th>Degree</th>
              <th>Grade</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {education.map(edu => (
              <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.grade}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                  {edu.to === null ? (
                    " Present"
                  ) : (
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    onClick={e => this.onDeleteEducation(e, edu._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (isEmpty(education)) {
      showeducation = <p className="lead text-muted">No Experience Found</p>;
    }

    return (
      <div>
        <Link
          to="/dashboard"
          className="btn btn-light"
          style={{ marginBottom: "30px" }}
        >
          Go Back
        </Link>
        <h4 className="md-4">Experience</h4>
        {showexperience}
        <h4 className="md-4">Education</h4>
        {showeducation}
      </div>
    );
  }
}

DeleteExperienceEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteexperience: PropTypes.func.isRequired,
  deleteeducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteexperience, deleteeducation }
)(DeleteExperienceEducation);
