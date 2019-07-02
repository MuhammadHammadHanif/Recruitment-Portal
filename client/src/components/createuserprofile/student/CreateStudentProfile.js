import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import SocialInputGroup from "../../common/SocialInputGroup";
import {
  createstudentprofile,
  getcurrentprofile
} from "../../../actions/profileActions";
import isEmpty from "../../../validations/isEmpty";

class CreateStudentProfile extends Component {
  state = {
    displaySocialInput: false,
    name: "",
    fathername: "",
    gender: "",
    nationality: "",
    dateofbirth: "",
    address: "",
    phone: "",
    email: "",
    cnic: "",
    country: "",
    city: "",
    maritalstatus: "",
    skills: "",
    linkedin: "",
    github: "",
    bio: "",
    certificates: "",
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
        name,
        fathername,
        gender,
        dateofbirth,
        address,
        phone,
        email,
        cnic,
        country,
        city,
        maritalstatus,
        social,
        bio,
        nationality,
        skills,
        certificates
      } = profile;
      name = !isEmpty(name) ? name : "";
      fathername = !isEmpty(fathername) ? fathername : "";
      address = !isEmpty(address) ? address : "";
      nationality = !isEmpty(nationality) ? nationality : "";
      skills = !isEmpty(skills) ? skills : "";
      certificates = !isEmpty(certificates) ? certificates : "";
      phone = !isEmpty(phone) ? phone : "";
      email = !isEmpty(email) ? email : "";
      gender = !isEmpty(gender) ? gender : "";
      dateofbirth = !isEmpty(dateofbirth) ? dateofbirth : "";
      cnic = !isEmpty(cnic) ? cnic : "";
      country = !isEmpty(country) ? country : "";
      city = !isEmpty(city) ? city : "";
      maritalstatus = !isEmpty(maritalstatus) ? maritalstatus : "";
      bio = !isEmpty(bio) ? bio : "";
      social = !isEmpty(social) ? social : {};
      social.linkedin = !isEmpty(social.linkedin) ? social.linkedin : "";
      social.github = !isEmpty(social.github) ? social.github : "";

      // Bring arrays back to CSV
      const nationalityCSV =
        profile && profile.nationality && profile.nationality.join(",");
      const skillsCSV = profile && profile.skills && profile.skills.join(",");
      const certificatesCSV =
        profile && profile.certificates && profile.certificates.join(",");

      // Set component fields state
      this.setState({
        name,
        fathername,
        gender,
        nationality: nationalityCSV,
        dateofbirth,
        address,
        phone,
        email,
        cnic: cnic.toString(),
        country,
        city,
        maritalstatus,
        skills: skillsCSV,
        linkedin: social.linkedin,
        github: social.github,
        bio,
        certificates: certificatesCSV
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
      name,
      fathername,
      gender,
      nationality,
      dateofbirth,
      address,
      phone,
      email,
      cnic,
      country,
      city,
      maritalstatus,
      skills,
      linkedin,
      github,
      bio,
      certificates
    } = this.state;
    const profile = {
      name,
      fathername,
      gender,
      nationality,
      dateofbirth,
      address,
      phone,
      email,
      cnic,
      country,
      city,
      maritalstatus,
      skills,
      linkedin,
      github,
      bio,
      certificates
    };
    this.props.createstudentprofile(profile, this.props.history);
  };
  render() {
    const { errors, displaySocialInput } = this.state;
    const { profile } = this.props.profile;

    let socialInput;
    let headerText;

    // for header text
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

    // social inputs
    if (displaySocialInput) {
      socialInput = (
        <div>
          <SocialInputGroup
            placeholder="Github Profile URL"
            name="github"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />
          <SocialInputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }

    // Select options for role
    const options = [
      { label: "Select Gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" }
    ];

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
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Father Name"
                  name="fathername"
                  value={this.state.fathername}
                  onChange={this.onChange}
                  error={errors.fathername}
                />
                <SelectListGroup
                  placeholder="* Select Gender"
                  name="gender"
                  value={this.state.gender}
                  options={options}
                  onChange={this.onChange}
                  error={errors.gender}
                />
                <TextFieldGroup
                  type="date"
                  name="dateofbirth"
                  value={this.state.dateofbirth}
                  onChange={this.onChange}
                  error={errors.dateofbirth}
                  info="Select your Date Of Birth"
                />
                <TextFieldGroup
                  placeholder="* Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="* Nationality"
                  name="nationality"
                  value={this.state.nationality}
                  onChange={this.onChange}
                  error={errors.nationality}
                  info="Please use comma separated values (eg. Pakistani,Indian etc)"
                />
                <TextFieldGroup
                  placeholder="* Contact Number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />
                <TextFieldGroup
                  placeholder="* CNIC"
                  name="cnic"
                  value={this.state.cnic}
                  onChange={this.onChange}
                  error={errors.cnic}
                  info="Don't use any spaces or (-)"
                />
                <TextFieldGroup
                  placeholder="* Country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                />
                <TextFieldGroup
                  placeholder="* City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <TextFieldGroup
                  placeholder="* Marital Status"
                  name="maritalstatus"
                  value={this.state.maritalstatus}
                  onChange={this.onChange}
                  error={errors.maritalstatus}
                  info="Single, Married, Divorced etc"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,Express etc)"
                />
                <TextFieldGroup
                  placeholder="Certificates"
                  name="certificates"
                  value={this.state.certificates}
                  onChange={this.onChange}
                  error={errors.certificates}
                  info="Please use comma separated values (eg. Data Science Certificate from Yales etc)"
                />
                <TextFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us about yourself"
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

CreateStudentProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createstudentprofile: PropTypes.func.isRequired,
  getcurrentprofile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createstudentprofile, getcurrentprofile }
)(withRouter(CreateStudentProfile));
