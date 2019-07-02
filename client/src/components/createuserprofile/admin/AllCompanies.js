import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { getcompanies, deletecompany } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";

class AllCompanies extends Component {
  componentDidMount() {
    this.props.getcompanies();
  }
  onClick = (e, id) => {
    e.preventDefault();
    this.props.deletecompany(id);
  };
  render() {
    const { allcompanies, loading } = this.props.profile;
    let companydata;
    if (loading) {
      companydata = <Spinner />;
    } else {
      if (allcompanies == null) {
        companydata = "No Students are Registered";
      } else {
        companydata = allcompanies.map(company => (
          <tr key={company._id}>
            <td>
              <Link to={`/companyprofile/${company.user}`}>
                {company.companyname}
              </Link>
            </td>
            <td>{company.email}</td>
            <td>
              <Moment format="DD MMM YYYY">{company.createdAt.from}</Moment>
            </td>
            <td>{company.phone}</td>
            <td>
              <button
                onClick={e => this.onClick(e, company.user)}
                className="btn btn-danger"
              >
                Delete
              </button>
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
                  <th>Company</th>
                  <th>Email</th>
                  <th>Account Created</th>
                  <th>Contact No</th>
                  <th />
                </tr>
              </thead>
              <tbody>{companydata}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

AllCompanies.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getcompanies: PropTypes.func.isRequired,
  deletecompany: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getcompanies, deletecompany }
)(AllCompanies);
