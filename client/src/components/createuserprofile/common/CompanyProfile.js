import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { getcompanyviewprofile } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";

class CompanyProfile extends Component {
  componentDidMount() {
    this.props.getcompanyviewprofile(this.props.match.params.id);
  }
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { viewprofile, loading } = this.props.profile;

    let companyprofile;

    if (viewprofile == null || loading) {
      companyprofile = <Spinner />;
    } else {
      companyprofile = (
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <h1 className="display-4 text-center">
                  {viewprofile.companyname}
                </h1>
                <p className="lead text-center">{viewprofile.website}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card card-body  mb-3">
                <h3 class="text-center text-info">About Us</h3>
                <p class="lead ">{viewprofile.additionaldescription}</p>
                <hr />
                <h3 class="text-center text-info">Our Services</h3>
                <div class="row">
                  <div class="d-flex flex-wrap justify-content-center align-items-center">
                    {viewprofile.services.map((service, i) => (
                      <div class="p-3" key={i}>
                        <i class="fa fa-check" /> {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h3 class="text-center text-info">Contact Us</h3>
              <ul class="list-group">
                <li class="list-group-item" key={viewprofile._id}>
                  <h4>Address</h4>
                  <p>{viewprofile.address}</p>
                  <p>
                    <strong>Contact No:</strong> {viewprofile.phone}
                  </p>
                  <p>
                    <strong>Email: </strong> {viewprofile.email}
                  </p>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <h3 class="text-center text-info">Address</h3>
              <ul class="list-group">
                <li class="list-group-item" key={viewprofile._id}>
                  <p>{viewprofile.address}</p>
                </li>
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
            {companyprofile}
          </div>
        </div>
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getcompanyviewprofile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getcompanyviewprofile }
)(withRouter(CompanyProfile));
