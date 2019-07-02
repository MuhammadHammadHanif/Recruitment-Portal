import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginuser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class Login extends Component {
  state = {
    email: "",
    role: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, role, password } = this.state;
    const userdata = { email, role, password };
    this.props.loginuser(userdata);
  };
  render() {
    const { errors } = this.state;

    // Select options for role
    const options = [
      { label: "Select Role", value: 0 },
      { label: "Admin", value: "Admin" },
      { label: "Company", value: "Company" },
      { label: "Student", value: "Student" }
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your Recruitment account
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />

              <SelectListGroup
                placeholder="Role"
                name="role"
                value={this.state.role}
                options={options}
                onChange={this.onChange}
                error={errors.role}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <input type="submit" className="btn btn-success btn-block mt-4" />
            </form>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginuser }
)(Login);
