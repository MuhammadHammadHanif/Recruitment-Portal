import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import SocialInputGroup from "../../common/SocialInputGroup";
import {
  createcompanyprofile,
  getcurrentprofile
} from "../../../actions/profileActions";
import isEmpty from "../../../validations/isEmpty";

class CreateCompanyProfile extends Component {
  state = {
    displaySocialInput: false,
    displayAdditionalInformation: false,
    companyname: "",
    establishdate: "",
    address: "",
    phone: "",
    website: "",
    email: "",
    services: "",
    twitter: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    annualsales: "",
    noofemployees: "",
    partners: "",
    additionaldescription: "",
    errors: {}
  };

  componentDidMount() {
    const { profile } = this.props.profile;
    if (profile !== null && Object.keys(profile).length > 0) {
      this.props.getcurrentprofile();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field dosen't exists, make empty string
      let {
        companyname,
        establishdate,
        address,
        phone,
        website,
        email,
        social,
        annualsales,
        noofemployees,
        services,
        partners,
        additionaldescription
      } = profile;
      companyname = !isEmpty(companyname) ? companyname : "";
      website = !isEmpty(website) ? website : "";
      services = !isEmpty(services) ? services : "";
      partners = !isEmpty(partners) ? partners : "";
      establishdate = !isEmpty(establishdate) ? establishdate : "";
      address = !isEmpty(address) ? address : "";
      phone = !isEmpty(phone) ? phone : "";
      email = !isEmpty(email) ? email : "";
      annualsales = !isEmpty(annualsales) ? annualsales : "";
      noofemployees = !isEmpty(noofemployees) ? noofemployees : "";
      additionaldescription = !isEmpty(additionaldescription)
        ? additionaldescription
        : "";
      social = !isEmpty(social) ? social : {};
      social.facebook = !isEmpty(social.facebook) ? social.facebook : "";
      social.linkedin = !isEmpty(social.linkedin) ? social.linkedin : "";
      social.twitter = !isEmpty(social.twitter) ? social.twitter : "";
      social.instagram = !isEmpty(social.instagram) ? social.instagram : "";

      // Bring arrays back to CSV
      const servicesCSV =
        profile && profile.services && profile.services.join(",");
      const partnersCSV =
        profile && profile.partners && profile.partners.join(",");

      // Set component fields state
      this.setState({
        companyname,
        establishdate,
        address,
        phone,
        website,
        email,
        services: servicesCSV,
        annualsales,
        noofemployees,
        partners: partnersCSV,
        additionaldescription,
        twitter: social.twitter,
        facebook: social.facebook,
        linkedin: social.linkedin,
        instagram: social.instagram
      });
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
      companyname,
      establishdate,
      address,
      phone,
      website,
      email,
      services,
      twitter,
      linkedin,
      facebook,
      instagram,
      annualsales,
      noofemployees,
      partners,
      additionaldescription
    } = this.state;
    const profile = {
      companyname,
      establishdate,
      address,
      phone,
      website,
      email,
      services,
      twitter,
      linkedin,
      facebook,
      instagram,
      annualsales,
      noofemployees,
      partners,
      additionaldescription
    };
    this.props.createcompanyprofile(profile, this.props.history);
  };
  render() {
    const {
      errors,
      displaySocialInput,
      displayAdditionalInformation
    } = this.state;
    const { profile } = this.props.profile;

    let socialInput;
    let additionalInformation;
    let headerText;

    if (profile !== null && Object.keys(profile).length > 0) {
      headerText = (
        <div>
          <h1 className="display-4 text-center">Edit Profile</h1>
        </div>
      );
    } else {
      headerText = (
        <div>
          <h1 className="display-4 text-center">Create Your Profile</h1>
          <p className="lead text-center">
            Let's get some information to make your profile stand out
          </p>
        </div>
      );
    }

    if (displaySocialInput) {
      socialInput = (
        <div>
          <SocialInputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <SocialInputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <SocialInputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <SocialInputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    if (displayAdditionalInformation) {
      additionalInformation = (
        <div>
          <TextFieldGroup
            placeholder="Associated Partners"
            name="partners"
            value={this.state.partners}
            onChange={this.onChange}
            error={errors.partners}
            info="Please use comma separated values (eg. Microsoft,Facebook etc)"
          />
          <TextFieldGroup
            placeholder="Annual Sales"
            name="annualsales"
            value={this.state.annualsales}
            onChange={this.onChange}
            error={errors.annualsales}
          />
          <TextFieldGroup
            placeholder="No Of Employees"
            name="noofemployees"
            value={this.state.noofemployees}
            onChange={this.onChange}
            error={errors.noofemployees}
          />
          <TextFieldGroup
            placeholder="Description"
            name="additionaldescription"
            value={this.state.additionaldescription}
            onChange={this.onChange}
            error={errors.additionaldescription}
            info="Please enter description bout your company"
          />
        </div>
      );
    }

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
              {headerText}
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company Name"
                  name="companyname"
                  value={this.state.companyname}
                  onChange={this.onChange}
                  error={errors.companyname}
                />
                <TextFieldGroup
                  type="date"
                  name="establishdate"
                  value={this.state.establishdate}
                  onChange={this.onChange}
                  error={errors.establishdate}
                  info="Select your company founding date"
                />
                <TextFieldGroup
                  placeholder="* Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="* Services"
                  name="services"
                  value={this.state.services}
                  onChange={this.onChange}
                  error={errors.services}
                  info="Please use comma separated values (eg. Management,Software Development etc)"
                />
                <TextFieldGroup
                  placeholder="* Contact Number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextAreaFieldGroup
                  placeholder="* Physical Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  info="Please enter your complete address"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayAdditionalInformation: !prevState.displayAdditionalInformation
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Some Additional Information
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {additionalInformation}
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInput: !prevState.displaySocialInput
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInput}
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

CreateCompanyProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createcompanyprofile: PropTypes.func.isRequired,
  getcurrentprofile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createcompanyprofile, getcurrentprofile }
)(withRouter(CreateCompanyProfile));
