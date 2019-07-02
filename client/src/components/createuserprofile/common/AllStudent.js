import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getstudents, deletestudent } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";

class AllStudent extends Component {
  componentDidMount() {
    this.props.getstudents();
  }
  onClick = (e, id) => {
    e.preventDefault();
    this.props.deletestudent(id);
  };
  render() {
    const { allstudents, loading } = this.props.profile;
    const { user } = this.props.auth;
    let studentdata;
    if (loading) {
      studentdata = <Spinner />;
    } else {
      if (allstudents == null) {
        studentdata = "No Students are Registered";
      } else {
        studentdata = allstudents.map(student => (
          <tr key={student._id}>
            <td>
              <Link to={`/studentprofile/${student.user}`}>{student.name}</Link>
            </td>
            <td>{student.email}</td>
            <td>
              {student.city}, {student.country}
            </td>
            <td>{student.phone}</td>
            <td>
              {user.role !== "Admin" ? (
                <Link
                  to={`/studentprofile/${student.user}`}
                  className="btn btn-info"
                >
                  View
                </Link>
              ) : (
                <button
                  onClick={e => this.onClick(e, student.user)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ));
      }
    }
    return (
      <div class="container">
        <Link
          to="/dashboard"
          className="btn btn-light"
          style={{ marginBottom: "30px" }}
        >
          Go Back
        </Link>
        <div class="row">
          <div class="col-md-12">
            <h3 style={{ marginBottom: "20px" }} className="md-4 text-center">
              Registered Student(s)
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Contact No</th>
                  <th />
                </tr>
              </thead>
              <tbody>{studentdata}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

AllStudent.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getstudents: PropTypes.func.isRequired,
  deletestudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getstudents, deletestudent }
)(AllStudent);
